const { spawn } = require('child_process');
const path = require('path');
// Import thêm 2 model này để truy vấn dữ liệu
const ProductFeature = require('../models/ProductFeature');
const Product = require('../models/Product');

const SearchService = {
    // 1. Hàm tính độ tương đồng Cosine
    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        return isNaN(similarity) ? 0 : similarity;
    },

    // 2. Hàm gọi Python lấy Vector từ ảnh
    async getVector(imagePath) {
        return new Promise((resolve, reject) => {
            const modelPath = path.join(__dirname, '../ai/models/model.pth');
            const scriptPath = path.join(__dirname, '../ai/predict.py');

            const py = spawn('python', [scriptPath, imagePath, modelPath]);

            let result = "";
            let error = "";

            py.stdout.on('data', (data) => result += data.toString());
            py.stderr.on('data', (data) => error += data.toString());

            py.on('close', (code) => {
                if (code !== 0) return reject(new Error(error || "AI Script failed"));
                try {
                    resolve(JSON.parse(result));
                } catch (e) {
                    reject(new Error("Lỗi định dạng JSON từ AI"));
                }
            });
        });
    },

    // 3. MỚI: Hàm so sánh Vector và trả về danh sách sản phẩm
    async findSimilarProducts(targetVector) {
        // Lấy toàn bộ danh sách Vector đã lưu trong DB
        const allFeatures = await ProductFeature.find();

        if (allFeatures.length === 0) return [];

        // Tính điểm tương đồng cho từng sản phẩm
        const scoredProducts = allFeatures.map(feature => {
            const score = this.cosineSimilarity(targetVector, feature.vector);
            return { productId: feature.productId, score };
        });

        // Sắp xếp giảm dần theo điểm số (cao nhất lên đầu)
        const topResults = scoredProducts
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Lấy top 10 sản phẩm

        // Lấy ID sản phẩm và truy vấn thông tin chi tiết từ bảng Product
        const productIds = topResults.map(item => item.productId);

        // Trả về danh sách sản phẩm thực tế
        return await Product.find({
            _id: { $in: productIds },
            status: 'Active' // Chỉ lấy sản phẩm đang bán
        }).lean();
    }
};

module.exports = { SearchService };