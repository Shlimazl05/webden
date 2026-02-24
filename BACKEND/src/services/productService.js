// const Product = require('../models/Product');

// const createProduct = async (productData) => {
//     // 1. Kiểm tra mã SKU (productCode) đã tồn tại chưa
//     const existingProduct = await Product.findOne({ productCode: productData.productCode });
//     if (existingProduct) {
//         throw new Error("Mã sản phẩm (SKU) này đã tồn tại!");
//     }

//     // 2. Tạo đối tượng sản phẩm mới
//     const newProduct = new Product({
//         productCode: productData.productCode,
//         productName: productData.productName,
//         salePrice: productData.salePrice,
//         stockQuantity: productData.stockQuantity,
//         imageUrl: productData.imageUrl,
//         specifications: productData.specifications, // Đây là Object linh hoạt
//         status: productData.status || 'Active',
//         // Tạm thời để trống mảng vector, sẽ dùng khi làm tới phần AI sau
//     });

//     return await newProduct.save();
// };

// const getAllProducts = async () => {
//     // .find({}) sẽ trả về một Mảng (Array) các sản phẩm
//     return await Product.find({}); 
// };

// module.exports = { createProduct,  getAllProducts};

const Product = require('../models/Product');

/**
 * TẠO SẢN PHẨM MỚI
 */
const createProduct = async (productData) => {
    // 1. Kiểm tra mã SKU (productCode) đã tồn tại chưa
    // Mặc dù Model có 'unique: true', việc check trước giúp trả về lỗi rõ ràng hơn
    const existingProduct = await Product.findOne({ productCode: productData.productCode });
    if (existingProduct) {
        throw new Error("Mã sản phẩm (SKU) này đã tồn tại trong hệ thống!");
    }

    // 2. Tạo đối tượng sản phẩm mới
    const newProduct = new Product({
        productCode: productData.productCode,
        productName: productData.productName,
        salePrice: productData.salePrice,
        stockQuantity: productData.stockQuantity || 0,
        imageUrl: productData.imageUrl,
        specifications: productData.specifications, // Object linh hoạt (chất liệu, kích thước...)
        status: productData.status || 'Active',
        // BỔ SUNG: Phải có categoryId để đúng với Model khóa ngoại bạn đã khai báo
        categoryId: productData.categoryId 
    });

    return await newProduct.save();
};

/**
 * LẤY TẤT CẢ SẢN PHẨM
 */
const getAllProducts = async () => {
    return await Product.find({})
        .populate('categoryId', 'name') // LẤY LUÔN TÊN DANH MỤC thay vì chỉ lấy ID
        .sort({ createdAt: -1 });       // Sản phẩm mới nhập hiển thị lên đầu
};

module.exports = { 
    createProduct, 
    getAllProducts 
};