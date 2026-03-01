

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
const getAllCategories = async (options = {}) => {
    // Ép kiểu limit và page về số nguyên để tránh lỗi tính toán
    const search = options.search ? options.search.trim() : '';
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    
    const filter = {};
    if (search) {
        // Sử dụng RegExp để tìm kiếm linh hoạt và không phân biệt hoa thường
        filter.name = { $regex: new RegExp(search, 'i') };
    }

    const skip = (page - 1) * limit;

    const [categories, totalCategories] = await Promise.all([
        Category.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Category.countDocuments(filter)
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