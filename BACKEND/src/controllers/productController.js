// const productService = require('../services/productService');

// exports.addProduct = async (req, res) => {
//     try {
//         const product = await productService.createProduct(req.body);
//         res.status(201).json({
//             message: "Nhập hàng vào kho thành công!",
//             product
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // HIỂN THỊ SẢN PHẨM
// exports.getProducts = async (req, res) => {
//     try {
//         const products = await productService.getAllProducts();
        
//         // KIỂM TRA TRƯỚC KHI GỬI: 
//         // Nếu sản phẩm tồn tại, gửi mảng đó đi. 
//         // Nếu không có sản phẩm nào, products sẽ là [], vẫn là một mảng.
//         res.status(200).json(products); 
//     } catch (error) {
//         // Nếu lỗi, gửi object lỗi (cái này sẽ làm map() bị lỗi nếu không xử lý ở frontend)
//         res.status(500).json({ message: error.message });
//     }
// };

// const productService = require('../services/productService');

// const createProduct = async (req, res) => {
//   try {
//     const product = await productService.createProduct(req.body);
//     res.status(201).json({
//       success: true,
//       message: "Tạo sản phẩm thành công!",
//       data: product
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   createProduct
// };

const productService = require('../services/productService');

// THÊM MỚI SẢN PHẨM
exports.addProduct = async (req, res) => {
    try {
        // req.body sẽ chứa các trường: productCode, productName, salePrice, categoryId, specifications...
        const product = await productService.createProduct(req.body);
        
        res.status(201).json({
            success: true,
            message: "Nhập hàng vào kho thành công!",
            data: product
        });
    } catch (error) {
        // Xử lý lỗi trùng mã sản phẩm (productCode) - lỗi 11000 của MongoDB
        if (error.code === 11000 || error.message.includes("tồn tại")) {
            return res.status(400).json({ 
                success: false, 
                message: "Mã sản phẩm (SKU) này đã tồn tại trong kho!" 
            });
        }

        res.status(400).json({ 
            success: false, 
            message: error.message || "Không thể thêm sản phẩm" 
        });
    }
};

// HIỂN THỊ DANH SÁCH SẢN PHẨM
exports.getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        
        // Luôn đảm bảo trả về một mảng [] nếu database trống
        // giúp Frontend map() không bao giờ bị lỗi undefined
        res.status(200).json({
            success: true,
            count: products ? products.length : 0,
            data: products || [] 
        });
    } catch (error) {
        // Nếu lỗi hệ thống, vẫn trả về mảng rỗng trong trường data để an toàn cho UI
        res.status(500).json({ 
            success: false, 
            message: "Lỗi hệ thống khi lấy danh sách sản phẩm",
            error: error.message,
            data: [] 
        });
    }
};