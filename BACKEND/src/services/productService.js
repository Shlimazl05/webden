
// const Product = require('../models/Product');

// /**
//  * TẠO SẢN PHẨM MỚI
//  */
// const createProduct = async (productData) => {
//     // 1. Kiểm tra mã SKU (productCode) đã tồn tại chưa
//     // Mặc dù Model có 'unique: true', việc check trước giúp trả về lỗi rõ ràng hơn
//     const existingProduct = await Product.findOne({ productCode: productData.productCode });
//     if (existingProduct) {
//         throw new Error("Mã sản phẩm (SKU) này đã tồn tại trong hệ thống!");
//     }

//     // 2. Tạo đối tượng sản phẩm mới
//     const newProduct = new Product({
//         productCode: productData.productCode,
//         productName: productData.productName,
//         salePrice: productData.salePrice,
//         stockQuantity: productData.stockQuantity || 0,
//         imageUrl: productData.imageUrl,
//         specifications: productData.specifications, // Object linh hoạt (chất liệu, kích thước...)
//         status: productData.status || 'Active',
//         // BỔ SUNG: Phải có categoryId để đúng với Model khóa ngoại bạn đã khai báo
//         categoryId: productData.categoryId 
//     });

//     return await newProduct.save();
// };

// /**
//  * LẤY TẤT CẢ SẢN PHẨM
//  */
// const getAllProducts = async () => {
//     return await Product.find({})
//         .populate('categoryId', 'name') // LẤY LUÔN TÊN DANH MỤC thay vì chỉ lấy ID
//         .sort({ createdAt: -1 });       // Sản phẩm mới nhập hiển thị lên đầu
// };

// module.exports = { 
//     createProduct, 
//     getAllProducts 
// };

const Product = require('../models/Product');
const slugify = require('slugify');

const createProduct = async (productData) => {
    // 1. Tự động sinh mã sản phẩm (SP-001) nếu chưa có
    if (!productData.productCode || productData.productCode === "HỆ THỐNG TỰ SINH") {
        const count = await Product.countDocuments();
        productData.productCode = `SP-${(count + 1).toString().padStart(3, '0')}`;
    }

    // 2. Kiểm tra trùng mã
    const existingProduct = await Product.findOne({ productCode: productData.productCode });
    if (existingProduct) throw new Error("Mã sản phẩm đã tồn tại!");

    // 3. Tạo Slug từ tên sản phẩm (tốt cho SEO/AI sau này)
    const slug = slugify(productData.productName, { lower: true, locale: 'vi', trim: true });

    const newProduct = new Product({
        ...productData,
        slug
    });

    return await newProduct.save();
};

const getAllProducts = async (options = {}) => {
    const { search = '', page = 1, limit = 10 } = options;
    
    // Logic tìm kiếm (Tên hoặc Mã SP)
    const filter = {};
    if (search) {
        filter.$or = [
            { productName: { $regex: new RegExp(search, 'i') } },
            { productCode: { $regex: new RegExp(search, 'i') } }
        ];
    }

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
        Product.find(filter)
            .populate('categoryId', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filter)
    ]);

    return {
        products,
        pagination: {
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: parseInt(page),
            limit: parseInt(limit)
        }
    };
};

const updateProduct = async (id, data) => {
    if (data.productName) {
        data.slug = slugify(data.productName, { lower: true, locale: 'vi' });
    }
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { createProduct, getAllProducts, updateProduct, deleteProduct };