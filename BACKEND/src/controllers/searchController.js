const { SearchService } = require('../services/searchService');

// Đảm bảo dùng exports.visualSearch
exports.visualSearch = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Chưa có ảnh upload" });

        // 1. Chuyển ảnh thành Vector
        const userVector = await SearchService.getVector(req.file.path);

        // 2. Tìm sản phẩm tương đồng
        const products = await SearchService.findSimilarProducts(userVector);

        res.status(200).json(products);
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};