// const { SearchService } = require('../services/searchService');

// // Đảm bảo dùng exports.visualSearch
// exports.visualSearch = async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).json({ message: "Chưa có ảnh upload" });

//         // 1. Chuyển ảnh thành Vector
//         const userVector = await SearchService.getVector(req.file.path);

//         // 2. Tìm sản phẩm tương đồng
//         const products = await SearchService.findSimilarProducts(userVector);

//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Controller Error:", error.message);
//         res.status(500).json({ message: error.message });
//     }
// };


const { SearchService } = require('../services/searchService');
const fs = require('fs'); // Thêm thư viện fs để xóa file

exports.visualSearch = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Chưa có ảnh upload" });
        }

        // 1. Gọi AI để lấy Vector từ ảnh vừa upload
        const aiData = await SearchService.getVector(req.file.path);

        // 2. Tìm sản phẩm tương đồng dựa trên Vector và Label
        const result = await SearchService.findSimilarProducts(aiData);

        // 3. XÓA FILE ẢNH (QUAN TRỌNG): 
        // Xóa ảnh tạm sau khi đã xử lý xong để tránh rác server
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Lỗi khi xóa file tạm:", err);
        });

        // 4. Trả về kết quả (bao gồm success, message, products...)
        // Nếu result.success là false (do similarity < 0.8), Frontend vẫn nhận được mã 200 
        // nhưng sẽ dựa vào success: false để hiển thị thông báo.
        return res.status(200).json(result);

    } catch (error) {
        console.error(" Controller Error:", error.message);

        // Nếu có lỗi hệ thống, cũng nên xóa file ảnh nếu nó còn tồn tại
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: "Hệ thống AI đang gặp sự cố, vui lòng thử lại sau."
        });
    }
};