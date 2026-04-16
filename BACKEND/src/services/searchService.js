const { spawn } = require('child_process');
const path = require('path');

const SearchService = {
    // Hàm tính độ tương đồng
    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    },

    // Hàm gọi Python lấy Vector
    async getVector(imagePath) {
        return new Promise((resolve, reject) => {
            // Khớp với tên file model.pth trong ảnh của bạn
            const modelPath = path.join(__dirname, '../ai/models/model.pth');
            const scriptPath = path.join(__dirname, '../ai/predict.py');

            // Chạy script python
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
    }
};

module.exports = { SearchService };