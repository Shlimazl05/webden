
const Product = require('../models/Product');
const slugify = require('slugify');
const mongoose = require('mongoose');
const removeAccents = require('../utils/removeAccents');

// ------ TẠO SẢN PHẨM -----stockQuantity //
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

    const productNameSearch = removeAccents(productData.productName);

    const newProduct = new Product({
        ...productData,
        productNameSearch,
        slug
    });

    return await newProduct.save();
};



// backend/services/product.service.js

const getAllProducts = async (options = {}) => {
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 20);
    const skip = (page - 1) * limit;

    // Trim và xóa ký tự đặc biệt để tránh lỗi RegExp
    const search = options.search ? options.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
    const { categoryId, status, minPrice, maxPrice, isAdmin } = options;

    const filter = {};

    // 1. Lọc theo trạng thái
    if (isAdmin) {
        if (status) filter.status = status;
    } else {
        filter.status = 'Active'; // Khách chỉ thấy hàng đang bán
    }

    // 2. Lọc theo danh mục
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    // 3. Lọc giá
    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.salePrice = {};
        if (!isNaN(parseFloat(minPrice))) filter.salePrice.$gte = parseFloat(minPrice);
        if (!isNaN(parseFloat(maxPrice))) filter.salePrice.$lte = parseFloat(maxPrice);
        if (Object.keys(filter.salePrice).length === 0) delete filter.salePrice;
    }

    // 4. LOGIC TÌM KIẾM: Fix lỗi không tìm thấy
    if (search) {
        const searchKeyword = removeAccents(search);
        filter.$or = [
            { productName: { $regex: search, $options: 'i' } },
            { productNameSearch: { $regex: searchKeyword, $options: 'i' } },
            { productCode: { $regex: search, $options: 'i' } }
        ];
    }

    const [products, totalProducts] = await Promise.all([
        Product.find(filter)
            .populate('categoryId', 'name status')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
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

        // --- MỚI: Cập nhật trường tìm kiếm không dấu ---
        data.productNameSearch = removeAccents(data.productName);
    }

    // 2. Tiến hành cập nhật
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

// ----- XÓA SẢN PHẨM ----- //
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};


// Script cập nhật dữ liệu cũ (Chạy 1 lần duy nhất)
const migrateProductNameSearch = async () => {
    try {
        console.log("--- BẮT ĐẦU CẬP NHẬT DỮ LIỆU TÌM KIẾM ---");

        // Lấy tất cả sản phẩm
        const products = await Product.find({});
        console.log(`Tìm thấy ${products.length} sản phẩm cần xử lý.`);

        let count = 0;
        for (let p of products) {
            // Sử dụng đúng tên hàm removeAccents bạn đã import ở đầu file
            p.productNameSearch = removeAccents(p.productName);

            // Lưu lại vào Database
            await p.save({ validateBeforeSave: false });
            count++;
            console.log(`[${count}/${products.length}] Đã cập nhật: ${p.productName}`);
        }

        console.log("--- HOÀN THÀNH CẬP NHẬT THÀNH CÔNG ---");
        return { success: true, message: `Đã cập nhật ${count} sản phẩm.` };
    } catch (error) {
        console.error("LỖI KHI MIGRATE DỮ LIỆU:", error.message);
        throw error;
    }
};


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, migrateProductNameSearch };