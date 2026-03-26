

const productService = require('../services/productService');

exports.addProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// D:\webden\backend\src\controllers\productController.js

exports.getProducts = async (req, res) => {
    try {

        await productService.migrateProductNameSearch(); 
        // 1. Lấy TẤT CẢ tham số từ req.query (bao gồm cả minPrice, maxPrice)
        const { search, page, limit, categoryId, status, minPrice, maxPrice, isAdmin: queryIsAdmin } = req.query;
        const isAdmin = queryIsAdmin === 'true' || (req.user && req.user.role === 'Admin');
        // 2. Chuẩn hóa dữ liệu đầu vào vào một object 'options' duy nhất
        const options = {
            search: search || '',
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 20,
            status: status || undefined,
            isAdmin: isAdmin,
            // Xử lý CategoryId: Nếu là chuỗi "null" hoặc "undefined" thì biến thành null thật
            categoryId: (categoryId && categoryId !== 'undefined' && categoryId !== 'null') ? categoryId : null,

            // Ép kiểu giá về số (Float) để Service xử lý dễ hơn
            minPrice: (minPrice !== undefined && minPrice !== '') ? parseFloat(minPrice) : undefined,
            maxPrice: (maxPrice !== undefined && maxPrice !== '' && maxPrice !== 'up') ? parseFloat(maxPrice) : undefined
        };

        // 3. Gọi Service duy nhất một lần với object options đã chuẩn hóa
        const result = await productService.getAllProducts(options);

        // 4. Trả về kết quả cho Frontend
        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        // Log lỗi chi tiết ra màn hình console của Backend để theo dõi
        console.error("LỖI TẠI PRODUCT CONTROLLER:", error.message);

        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi tải sản phẩm: " + error.message
        });
    }
};



exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: "ID sản phẩm không hợp lệ" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: "Xóa thành công" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};