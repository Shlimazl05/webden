
const Product = require('../models/Product'); 
const Category = require('../models/Category');
const slugify = require('slugify');
// TẠO DANH MỤC
const createCategory = async (data) => {
    const { name } = data;
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
        throw new Error("Tên danh mục này đã tồn tại!");
    }

    const slug = slugify(name, { lower: true, locale: 'vi', trim: true });
    const newCategory = new Category({ ...data, slug });
    return await newCategory.save();
};

// CẬP NHẬT: Thêm tham số search, page, limit
// const getAllCategories = async (options = {}) => {
//     // Ép kiểu limit và page về số nguyên để tránh lỗi tính toán
//     const search = options.search ? options.search.trim() : '';
//     const page = parseInt(options.page) || 1;
//     const limit = parseInt(options.limit) || 10;
    
//     const filter = {};
//     if (search) {
//         // Sử dụng RegExp để tìm kiếm linh hoạt và không phân biệt hoa thường
//         filter.name = { $regex: new RegExp(search, 'i') };
//     }

//     const skip = (page - 1) * limit;

//     const [categories, totalCategories] = await Promise.all([
//         Category.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit),
//         Category.countDocuments(filter)
//     ]);

//     const totalPages = Math.ceil(totalCategories / limit);

//     return {
//         categories,
//         pagination: {
//             totalCategories,
//             totalPages,
//             currentPage: page,
//             limit
//         }
//     };
// };

const getAllCategories = async (options = {}) => {
    const search = options.search ? options.search.trim() : '';
    const status = options.status || '';
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 10);
    const skip = (page - 1) * limit;

    // Thiết lập bộ lọc tìm kiếm theo tên (không phân biệt hoa thường)
    const matchQuery = {};
    if (search) {
        matchQuery.name = { $regex: new RegExp(search, 'i') };
    }

    if (status && status !== 'All') {
        matchQuery.status = status; // Ví dụ: "Active" hoặc "Hidden"
    }

    /**
     * Sử dụng Aggregation Pipeline để tối ưu hóa truy vấn:
     * 1. $match: Lọc danh mục theo điều kiện tìm kiếm.
     * 2. $lookup: Thực hiện Left Outer Join với collection 'products'.
     * 3. $addFields: Tính toán trường productCount dựa trên mảng sản phẩm tìm được.
     * 4. $project: Loại bỏ mảng sản phẩm tạm thời để giảm dung lượng dữ liệu trả về.
     */
    const categoriesPromise = Category.aggregate([
        { $match: matchQuery },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'productList'
            }
        },
        {
            $addFields: {
                productCount: { $size: '$productList' }
            }
        },
        { $project: { productList: 0 } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);

    // Đếm tổng số bản ghi khớp điều kiện để phục vụ tính toán phân trang
    const totalCategoriesPromise = Category.countDocuments(matchQuery);

    const [categories, totalCategories] = await Promise.all([
        categoriesPromise,
        totalCategoriesPromise
    ]);

    const totalPages = Math.ceil(totalCategories / limit);

    return {
        categories,
        pagination: {
            totalCategories,
            totalPages,
            currentPage: page,
            limit
        }
    };
};
// CẬP NHẬT
const updateCategory = async (id, data) => {
    if (data.name) {
        data.slug = slugify(data.name, { lower: true, locale: 'vi' });
    }
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};