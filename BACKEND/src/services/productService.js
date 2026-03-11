
const Product = require('../models/Product');
const slugify = require('slugify');
const mongoose = require('mongoose');
// ------ TẠO SẢN PHẨM ----- //
const createProduct = async (productData) => {
    // 1. Tự động sinh mã sản phẩm (SP-001) nếu chưa có
    if (!productData.productCode || productData.productCode === "HỆ THỐNG TỰ SINH") {
        // Tìm sản phẩm cuối cùng dựa trên mã giảm dần
        const lastProduct = await Product.findOne().sort({ productCode: -1 });

        let nextNumber = 1;
        if (lastProduct && lastProduct.productCode.startsWith('SP-')) {
            // Tách phần số ra khỏi 'SP-', ví dụ 'SP-005' -> 5
            const lastNumber = parseInt(lastProduct.productCode.replace('SP-', ''));
            nextNumber = lastNumber + 1;
        }

        productData.productCode = `SP-${nextNumber.toString().padStart(3, '0')}`;
    }

    // 2. Kiểm tra trùng mã
    const existingProduct = await Product.findOne({ productCode: productData.productCode });
    if (existingProduct) throw new Error("Mã sản phẩm đã tồn tại!");

    // 3. Tạo Slug từ tên sản phẩm (tốt cho SEO/AI sau này)
    const slugName = slugify(productData.productName, { lower: true, locale: 'vi', trim: true });
    const slugCode = slugify(productData.productCode, { lower: true });
    const slug = `${slugName}-${slugCode}`;

    const newProduct = new Product({
        ...productData,
        slug
    });

    return await newProduct.save();
};

// ----- LẤY DANH SÁCH SẢN PHẨM
const getAllProducts = async (options = {}) => {
    // Chuẩn hóa dữ liệu đầu vào
    const search = options.search ? options.search.trim() : '';
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 20);
    const skip = (page - 1) * limit;
    const { categoryId, status, minPrice, maxPrice } = options;


    // Thiết lập bộ lọc tìm kiếm (Tên sản phẩm hoặc Mã SKU)
    const filter = {};
    // --- CẬP NHẬT: Lọc theo trạng thái (Active/Hidden) ---
    if (status) {
        filter.status = status;
    }

    // --- CẬP NHẬT: Lọc theo danh mục (Sửa lỗi dính sản phẩm khác) ---
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }


    // 3. Lọc giá (Chỉ thêm nếu là số hợp lệ)
    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.salePrice = {};
        if (typeof minPrice === 'number' && !isNaN(minPrice)) {
            filter.salePrice.$gte = minPrice;
        }
        if (typeof maxPrice === 'number' && !isNaN(maxPrice)) {
            filter.salePrice.$lte = maxPrice;
        }
        // Nếu không có điều kiện nào hợp lệ thì xóa luôn field
        if (Object.keys(filter.salePrice).length === 0) delete filter.salePrice;
    }

    if (search) {
        filter.$or = [
            { productName: { $regex: new RegExp(search, 'i') } },
            { productCode: { $regex: new RegExp(search, 'i') } }
        ];
    }

    /**
     * Thực hiện truy vấn song song để tối ưu thời gian phản hồi:
     * 1. find: Lấy danh sách sản phẩm theo bộ lọc, phân trang và liên kết dữ liệu danh mục.
     * 2. countDocuments: Đếm tổng số bản ghi khớp điều kiện để phục vụ tính toán phân trang.
     */
    const [products, totalProducts] = await Promise.all([
        Product.find(filter)
            .populate('categoryId', 'name status') // LẤY THÊM TRƯỜNG STATUS CỦA DANH MỤC
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Product.countDocuments(filter)
    ]);


    // Tính toán thông tin phân trang tổng quát
    const totalPages = Math.ceil(totalProducts / limit);

    return {
        products,
        pagination: {
            totalProducts,
            totalPages,
            currentPage: page,
            limit
        }
    };
};

// ----- LẤY CHI TIẾT SẢN PHẨM ----- //
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id)
            .populate('categoryId', 'name status') // Lấy thêm tên danh mục để hiện trên UI
            .lean();
        return product;
    } catch (error) {
        throw new Error("Lỗi khi truy vấn sản phẩm: " + error.message);
    }
};

// ----- CẬP NHẬT SẢN PHẨM ----- //
const updateProduct = async (id, data) => {
    // 1. Nếu người dùng thay đổi tên sản phẩm, chúng ta phải tính lại Slug
    if (data.productName) {
        // Tìm sản phẩm hiện tại để lấy mã productCode (nếu trong data gửi lên không có)
        const currentProduct = await Product.findById(id);
        if (!currentProduct) throw new Error("Sản phẩm không tồn tại!");

        const code = data.productCode || currentProduct.productCode;

        // Tạo slug kết hợp Tên + Mã (Ví dụ: den-chum-sp-004)
        const slugName = slugify(data.productName, { lower: true, locale: 'vi', trim: true });
        const slugCode = slugify(code, { lower: true });

        data.slug = `${slugName}-${slugCode}`;
    }

    // 2. Tiến hành cập nhật
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

// ----- XÓA SẢN PHẨM ----- //
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };