

const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        // Lấy search, page, limit từ URL (VD: ?search=den&page=1)
        const { search, page, limit, status } = req.query;
        
        const result = await categoryService.getAllCategories({
            search: search || '',
            status: status || '',
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });

        // Trả về đúng cấu trúc mà Frontend Hook đang đợi
        res.status(200).json({ 
            success: true, 
            data: result 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};