const Category = require('../models/Category');
const slugify = require('slugify');

const createCategory = async (data) => {
    const { name } = data;

    // 1. Kiểm tra tên danh mục đã tồn tại chưa
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
        throw new Error("Tên danh mục này đã tồn tại!");
    }

    // 2. Tự động tạo slug (Ví dụ: "Đèn Chùm Pha Lê" -> "den-chum-pha-le")
    const slug = slugify(name, {
        lower: true,      // Chuyển về chữ thường
        locale: 'vi',     // Hỗ trợ tiếng Việt
        trim: true
    });

    // 3. Tạo và lưu
    const newCategory = new Category({
        ...data,
        slug: slug
    });

    return await newCategory.save();
};

const getAllCategories = async () => {
    // Trả về danh sách danh mục, sắp xếp theo tên A-Z
    return await Category.find().sort({ name: 1 });
};

const updateCategory = async (id, data) => {
    // Nếu đổi tên thì phải tạo lại slug mới
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