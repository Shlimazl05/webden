const ImportOrder = require('../models/ImportOrder');
const ImportDetail = require('../models/ImportDetail');
const Product = require('../models/Product');
const slugify = require('slugify');

/**
 * Xử lý tạo mới hóa đơn nhập hàng và cập nhật tồn kho sản phẩm
 * @param {Object} data - Dữ liệu hóa đơn từ Frontend gửi về
 * @returns {Promise<Object>} Hóa đơn đã được lưu thành công
 */
const createImportOrder = async (data) => {
    try {
        // 1. Khởi tạo mã phiếu nhập tự động (PN-001, PN-002...)
        // Tìm bản ghi cuối cùng để lấy mã số lớn nhất, tránh trùng lặp khi xóa bản ghi cũ
        const lastOrder = await ImportOrder.findOne().sort({ importCode: -1 });
        let nextNumber = 1;
        if (lastOrder && lastOrder.importCode.startsWith('PN-')) {
            const lastNumber = parseInt(lastOrder.importCode.replace('PN-', ''));
            nextNumber = lastNumber + 1;
        }
        const importCode = `PN-${nextNumber.toString().padStart(3, '0')}`;

        // 2. Lưu thông tin hóa đơn tổng (Header)
        const newOrder = new ImportOrder({
            importCode,
            supplierId: data.supplierId,
            employeeId: data.employeeId || "65f123456789012345678901", // Placeholder Admin ID
            totalAmount: data.totalAmount,
            note: data.note,
            status: 'Completed'
        });
        const savedOrder = await newOrder.save();

        // 3. Xử lý từng dòng sản phẩm trong danh sách nhập
        for (const item of data.items) {
            // Lưu vào bảng chi tiết hóa đơn
            await ImportDetail.create({
                importOrderId: savedOrder._id,
                productId: item.productId,
                quantity: item.quantity,
                importPrice: item.importPrice,
                newSalePrice: item.newSalePrice,
                subTotal: item.quantity * item.importPrice
            });

            // LOGIC CẬP NHẬT TRẠNG THÁI SẢN PHẨM TRONG KHO
            // - Tăng số lượng tồn kho ($inc)
            const updateData = { $inc: { stockQuantity: item.quantity } };
            
            // - Nếu có cập nhật giá bán mới (> 0)
            if (item.newSalePrice > 0) {
                // Lấy thông tin sản phẩm hiện tại để tạo slug mới đồng bộ
                const currentProduct = await Product.findById(item.productId);
                if (currentProduct) {
                    const slugName = slugify(currentProduct.productName, { lower: true, locale: 'vi' });
                    const slugCode = slugify(currentProduct.productCode, { lower: true });
                    
                    updateData.$set = { 
                        salePrice: item.newSalePrice,
                        slug: `${slugName}-${slugCode}` // Đảm bảo slug luôn unique theo mã SP
                    };
                }
            }

            await Product.findByIdAndUpdate(item.productId, updateData);
        }

        return savedOrder;
    } catch (error) {
        throw error;
    }
};

/**
 * Lấy danh sách hóa đơn nhập kèm thông tin chi tiết hàng hóa (Dùng cho giao diện Xổ dòng)
 * @param {Object} options - Tùy chọn phân trang (page, limit)
 * @returns {Promise<Object>} Danh sách hóa đơn đã lồng chi tiết sản phẩm
 */

/**
 * Lấy danh sách hóa đơn nhập kèm tìm kiếm và phân trang (Đã sửa để lấy Ảnh sản phẩm)
 */
const getAllOrders = async (options = {}) => {
    const search = options.search ? options.search.trim() : '';
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 10);
    const skip = (page - 1) * limit;

    // Khởi tạo Pipeline cho Aggregation
    const pipeline = [
        // 1. Nối với bảng Nhà cung cấp
        {
            $lookup: {
                from: 'suppliers',
                localField: 'supplierId',
                foreignField: '_id',
                as: 'supplierId'
            }
        },
        { $unwind: '$supplierId' },

        // 2. Logic tìm kiếm (Mã phiếu hoặc Tên nhà cung cấp)
        {
            $match: search ? {
                $or: [
                    { importCode: { $regex: new RegExp(search, 'i') } },
                    { 'supplierId.name': { $regex: new RegExp(search, 'i') } }
                ]
            } : {}
        },

        // 3. Sắp xếp, Phân trang
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },

        // 4. LẤY CHI TIẾT VÀ SẢN PHẨM (Kỹ thuật mấu chốt để lấy được ảnh)
        {
            $lookup: {
                from: 'importdetails',
                let: { orderId: '$_id' },
                pipeline: [
                    { $match: { $expr: { $eq: ['$importOrderId', '$$orderId'] } } },
                    {
                        $lookup: {
                            from: 'products', // Tên collection sản phẩm (phải chính xác)
                            localField: 'productId',
                            foreignField: '_id',
                            as: 'productData'
                        }
                    },
                    { $unwind: '$productData' },
                    {
                        // Chỉ lấy các trường cần thiết để nhẹ dữ liệu
                        $project: {
                            _id: 1,
                            quantity: 1,
                            importPrice: 1,
                            subTotal: 1,
                            productId: {
                                _id: '$productData._id',
                                productName: '$productData.productName',
                                productCode: '$productData.productCode',
                                imageUrl: '$productData.imageUrl'
                            }
                        }
                    }
                ],
                as: 'details'
            }
        }
    ];

    // Thực thi Aggregation
    const orders = await ImportOrder.aggregate(pipeline);

    // 5. Tính toán tổng số bản ghi để phân trang
    let totalOrders;
    if (search) {
        const countPipeline = [
            { $lookup: { from: 'suppliers', localField: 'supplierId', foreignField: '_id', as: 'sup' } },
            { $unwind: '$sup' },
            {
                $match: {
                    $or: [
                        { importCode: { $regex: new RegExp(search, 'i') } },
                        { 'sup.name': { $regex: new RegExp(search, 'i') } }
                    ]
                }
            },
            { $count: "total" }
        ];
        const countRes = await ImportOrder.aggregate(countPipeline);
        totalOrders = countRes.length > 0 ? countRes[0].total : 0;
    } else {
        totalOrders = await ImportOrder.countDocuments();
    }

    return {
        orders, // Trình duyệt giờ đã nhận được mảng details có chứa productId đầy đủ ảnh
        pagination: {
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: page,
            limit
        }
    };
};

/**
 * Xử lý xóa hóa đơn và hoàn trả (trừ) số lượng tồn kho tương ứng
 * @param {String} id - ID của hóa đơn cần xóa
 * @returns {Promise<Object>} Kết quả xóa
 */
const deleteImportOrder = async (id) => {
    // 1. Lấy danh sách chi tiết để biết cần trừ bao nhiêu hàng trong kho
    const details = await ImportDetail.find({ importOrderId: id });

    // 2. Cập nhật giảm số lượng kho cho từng sản phẩm liên quan
    for (const item of details) {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { stockQuantity: -item.quantity }
        });
    }

    // 3. Xóa dữ liệu ở cả 2 bảng (Chi tiết và Hóa đơn chính)
    await ImportDetail.deleteMany({ importOrderId: id });
    return await ImportOrder.findByIdAndDelete(id);
};

module.exports = {
    createImportOrder,
    getAllOrders,
    deleteImportOrder
};