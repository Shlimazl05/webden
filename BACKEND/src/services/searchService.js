// const { spawn } = require('child_process');
// const path = require('path');
// // Import thêm 2 model này để truy vấn dữ liệu
// const ProductFeature = require('../models/ProductFeature');
// const Product = require('../models/Product');
// const Category = require('../models/Category');

// const CATEGORY_MAPPING = {
//     'DenBan': 'den-ban',
//     'DenChieuTuong': 'den-chieu-tuong',
//     'DenChumCD': 'den-chum-co-dien',
//     'DenChumHD': 'den-chum-hien-dai',
//     'DenTha': 'den-tha',
//     'DenTuong': 'den-tuong',
//     'OpTranLED': 'den-led-op-tran',
//     'OpTranPL': 'den-mam-op-tran-pha-le'
// };

// const SearchService = {
//     // 1. Hàm tính độ tương đồng Cosine
//     cosineSimilarity(vecA, vecB) {
//         let dotProduct = 0;
//         let normA = 0;
//         let normB = 0;
//         for (let i = 0; i < vecA.length; i++) {
//             dotProduct += vecA[i] * vecB[i];
//             normA += vecA[i] * vecA[i];
//             normB += vecB[i] * vecB[i];
//         }
//         const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
//         return isNaN(similarity) ? 0 : similarity;
//     },

//     // 2. Hàm gọi Python lấy Vector từ ảnh
//     async getVector(imagePath) {
//         return new Promise((resolve, reject) => {
//             const modelPath = path.join(__dirname, '../ai/models/model.pth');
//             const scriptPath = path.join(__dirname, '../ai/predict.py');

//             const py = spawn('python', [scriptPath, imagePath, modelPath]);

//             let result = "";
//             let error = "";

//             py.stdout.on('data', (data) => result += data.toString());
//             py.stderr.on('data', (data) => error += data.toString());

//             py.on('close', (code) => {
//                 if (code !== 0) return reject(new Error(error || "AI Script failed"));
//                 try {
//                     resolve(JSON.parse(result));
//                 } catch (e) {
//                     reject(new Error("Lỗi định dạng JSON từ AI"));
//                 }
//             });
//         });
//     },

//     // 3. MỚI: Hàm so sánh Vector và trả về danh sách sản phẩm
//     async findSimilarProducts(targetVector) {
//         // 1. Lấy toàn bộ vector
//         const allFeatures = await ProductFeature.find();
//         if (allFeatures.length === 0) return [];

//         // 2. Tính điểm và sắp xếp ID theo điểm cao đến thấp
//         const scoredResults = allFeatures.map(feature => ({
//             productId: feature.productId.toString(), // Chuyển sang string để dễ so sánh
//             score: this.cosineSimilarity(targetVector, feature.vector)
//         }))
//             .sort((a, b) => b.score - a.score) // Cao nhất lên đầu
//             .slice(0, 10);

//         const productIds = scoredResults.map(item => item.productId);

//         // 3. Truy vấn sản phẩm từ DB
//         const products = await Product.find({
//             _id: { $in: productIds },
//             status: 'Active'
//         }).lean();

//         // --- BƯỚC QUAN TRỌNG: SẮP XẾP LẠI KẾT QUẢ THEO THỨ TỰ scoredResults ---
//         const sortedProducts = scoredResults.map(result => {
//             return products.find(p => p._id.toString() === result.productId);
//         }).filter(p => p !== undefined); // Loại bỏ nếu lỡ có sản phẩm bị null

//         return sortedProducts; // Trả về danh sách đã được sắp xếp chuẩn
//     }
// };

// module.exports = { SearchService };


const { spawn } = require('child_process');
const path = require('path');
const ProductFeature = require('../models/ProductFeature');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Bản đồ ánh xạ giữa Label của AI và Slug của Category trong Database
const CATEGORY_MAPPING = {
    'DenBan': 'den-ban',
    'DenChieuTuong': 'den-chieu-tuong',
    'DenChumCD': 'den-chum-co-dien',
    'DenChumHD': 'den-chum-hien-dai',
    'DenTha': 'den-tha',
    'DenTuong': 'den-tuong',
    'OpTranLED': 'den-led-op-tran',
    'OpTranPL': 'den-mam-op-tran-pha-le'
};

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

    // 2. Hàm gọi Python lấy dữ liệu AI (Vector + Category Label)
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
                    // Trả về object: { vector: [...], category_label: "..." }
                    resolve(JSON.parse(result));
                } catch (e) {
                    reject(new Error("Lỗi định dạng JSON từ AI"));
                }
            });
        });
    },

    // 3. Hàm so sánh Vector và chỉ tìm trong danh mục tương ứng
    async findSimilarProducts(aiData) {
        const { vector, category_label } = aiData;

        // BƯỚC 1: Tìm Category ID dựa trên nhãn AI trả về
        const targetSlug = CATEGORY_MAPPING[category_label];
        const category = await Category.findOne({ slug: targetSlug });

        if (!category) {
            console.error(`❌ Không tìm thấy danh mục có slug: ${targetSlug} trong DB`);
            return [];
        }

        console.log(`🔍 AI nhận diện loại: ${category_label} -> Lọc theo danh mục: ${category.name}`);

        // BƯỚC 2: Tìm tất cả sản phẩm thuộc danh mục này
        const productsInCat = await Product.find({
            categoryId: category._id,
            status: 'Active'
        }).select('_id');

        const validProductIds = productsInCat.map(p => p._id.toString());

        // BƯỚC 3: Chỉ lấy vector của những sản phẩm nằm trong danh mục này
        const filteredFeatures = await ProductFeature.find({
            productId: { $in: validProductIds }
        });

        if (filteredFeatures.length === 0) return [];

        // BƯỚC 4: Tính điểm tương đồng và sắp xếp
        const scoredResults = filteredFeatures.map(feature => ({
            productId: feature.productId.toString(),
            score: this.cosineSimilarity(vector, feature.vector)
        }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        const resultIds = scoredResults.map(item => item.productId);

        // BƯỚC 5: Lấy thông tin sản phẩm và giữ đúng thứ tự điểm số
        const products = await Product.find({ _id: { $in: resultIds } }).lean();

        const sortedProducts = scoredResults.map(result => {
            return products.find(p => p._id.toString() === result.productId);
        }).filter(Boolean);

        return sortedProducts;
    }
};

module.exports = { SearchService };