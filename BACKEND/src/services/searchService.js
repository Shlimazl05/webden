

// const { spawn } = require('child_process');
// const path = require('path');
// const ProductFeature = require('../models/ProductFeature');
// const Product = require('../models/Product');
// const Category = require('../models/Category');
// // ai
// const aiClient = require('../utils/aiClient');

// // Bản đồ ánh xạ giữa Label của AI và Slug của Category trong Database
// const CATEGORY_MAPPING = {
//     'DenBan': 'den-ban',
//     'DenChieuTuong': 'den-chieu-tuong',
//     'DenChumCD': 'den-chum-co-dien',
//     'DenChumHD': 'den-chum-hien-dai',
//     'DenTha': 'den-tha',
//     'DenTuong': 'den-tuong',
//     'OpTranLED': 'den-op-tran-hien-dai-led',
//     'OpTranPL': 'den-op-tran-pha-le'
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

//     // 2. Hàm gọi Python lấy dữ liệu AI (Vector + Category Label)
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
//                     // Trả về object: { vector: [...], category_label: "..." }
//                     resolve(JSON.parse(result));
//                 } catch (e) {
//                     reject(new Error("Lỗi định dạng JSON từ AI"));
//                 }
//             });
//         });
//     },

//     // 3. Hàm so sánh Vector và chỉ tìm trong danh mục tương ứng
//     async findSimilarProducts(aiData) {
//         const { vector, category_label } = aiData;

//         // BƯỚC 1: Tìm Category ID dựa trên nhãn AI trả về
//         const targetSlug = CATEGORY_MAPPING[category_label];
//         const category = await Category.findOne({ slug: targetSlug });

//         if (!category) {
//             console.error(`❌ AI nhận diện loại: ${category_label} nhưng không tìm thấy slug: ${targetSlug} trong DB`);
//             return [];
//         }

//         // BƯỚC 2: Tìm tất cả sản phẩm thuộc danh mục này
//         // Lưu ý: Lấy thêm productName để phục vụ việc in log ở Terminal
//         const productsInCat = await Product.find({
//             categoryId: category._id,
//             status: 'Active'
//         }).select('_id productName');

//         const validProductIds = productsInCat.map(p => p._id.toString());

//         // BƯỚC 3: Chỉ lấy vector của những sản phẩm nằm trong danh mục này
//         const filteredFeatures = await ProductFeature.find({
//             productId: { $in: validProductIds }
//         });

//         if (filteredFeatures.length === 0) {
//             console.log(`⚠️ Không có dữ liệu vector nào cho danh mục: ${category.name}`);
//             return [];
//         }

//         // BƯỚC 4: Tính điểm tương đồng và sắp xếp toàn bộ danh sách
//         const scoredResults = filteredFeatures.map(feature => ({
//             productId: feature.productId.toString(),
//             score: this.cosineSimilarity(vector, feature.vector)
//         }))
//             .sort((a, b) => b.score - a.score); // Sắp xếp từ cao xuống thấp

//         // ============================================================
//         // 📊 ĐOẠN CODE HIỂN THỊ CHỈ SỐ TƯƠNG ĐỒNG Ở TERMINAL
//         // ============================================================
//         console.log(`\n────────────────────────────────────────────────`);
//         console.log(`📡 [AI VISUAL SEARCH REPORT]`);
//         console.log(`🎯 Nhận diện danh mục: ${category_label} (${category.name})`);
//         console.log(`📈 Top 5 sản phẩm tương đồng nhất:`);

//         scoredResults.slice(0, 5).forEach((item, index) => {
//             // Tìm tên sản phẩm từ danh sách đã lấy ở Bước 2
//             const pInfo = productsInCat.find(p => p._id.toString() === item.productId);
//             // Chuyển điểm số sang phần trăm (Ví dụ: 0.985 -> 98.50%)
//             const scorePercent = (item.score * 100).toFixed(2);

//             console.log(`${index + 1}. [${scorePercent}%] - ${pInfo ? pInfo.productName : 'Sản phẩm ẩn'}`);
//         });
//         console.log(`────────────────────────────────────────────────\n`);
//         // ============================================================

//         // Lấy Top 10 kết quả cuối cùng để trả về Frontend
//         const top10Results = scoredResults.slice(0, 10);
//         const resultIds = top10Results.map(item => item.productId);

//         // BƯỚC 5: Lấy thông tin chi tiết sản phẩm
//         const products = await Product.find({ _id: { $in: resultIds } }).lean();

//         // Giữ đúng thứ tự điểm số từ cao xuống thấp
//         const sortedProducts = top10Results.map(result => {
//             return products.find(p => p._id.toString() === result.productId);
//         }).filter(Boolean);

//         return {
//             products: sortedProducts,
//             categoryName: category.name // Trả về "Đèn bàn", "Đèn thả"...
//         };
//     }
// };

// module.exports = { SearchService };




const ProductFeature = require('../models/ProductFeature');
const Product = require('../models/Product');
const Category = require('../models/Category');
// ai - Kết nối tới Python API
const aiClient = require('../utils/aiClient');

// Bản đồ ánh xạ giữa Label của AI và Slug của Category trong Database
const CATEGORY_MAPPING = {
    'DenBan': 'den-ban',
    'DenChieuTuong': 'den-chieu-tuong',
    'DenChumCD': 'den-chum-co-dien',
    'DenChumHD': 'den-chum-hien-dai',
    'DenTha': 'den-tha',
    'DenTuong': 'den-tuong',
    'OpTranLED': 'den-op-tran-hien-dai-led',
    'OpTranPL': 'den-op-tran-pha-le'
};

const SearchService = {
    // 1. Hàm tính độ tương đồng Cosine
    // Lưu ý: Vì vector đã được L2 normalize từ Python, hàm này sẽ trả về giá trị từ 0 đến 1
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

    // 2. Hàm gọi Python lấy dữ liệu AI qua FastAPI
    async getVector(imagePath) {
        try {
            // imagePath nên là đường dẫn tuyệt đối trên server
            const response = await aiClient.post('/predict', { path: imagePath });
            return response.data; // Trả về { category_label, vector }
        } catch (error) {
            console.error("❌ Lỗi khi gọi AI Server:", error.message);
            // Ném lỗi để Controller có thể bắt được và trả về lỗi 500 cho khách
            throw new Error("Hệ thống nhận diện hình ảnh đang bận, vui lòng thử lại sau.");
        }
    },

    // 3. Hàm so sánh Vector và chỉ tìm trong danh mục tương ứng
    async findSimilarProducts(aiData) {
        const { vector, category_label } = aiData;

        // BƯỚC 1: Tìm Category ID dựa trên nhãn AI trả về
        const targetSlug = CATEGORY_MAPPING[category_label];
        const category = await Category.findOne({ slug: targetSlug });

        if (!category) {
            console.error(`❌ AI nhận diện loại: ${category_label} nhưng không tìm thấy slug: ${targetSlug} trong DB`);
            return { products: [], categoryName: "Không xác định" };
        }

        // BƯỚC 2: Tìm tất cả sản phẩm Active thuộc danh mục này
        const productsInCat = await Product.find({
            categoryId: category._id,
            status: 'Active'
        }).select('_id productName').lean(); // Dùng .lean() để tăng tốc độ query

        const validProductIds = productsInCat.map(p => p._id.toString());

        // BƯỚC 3: Lấy vector đặc trưng của các sản phẩm này
        const filteredFeatures = await ProductFeature.find({
            productId: { $in: validProductIds }
        });

        if (filteredFeatures.length === 0) {
            console.log(`⚠️ Không có dữ liệu vector nào cho danh mục: ${category.name}`);
            return { products: [], categoryName: category.name };
        }

        // BƯỚC 4: Tính điểm tương đồng và sắp xếp
        const scoredResults = filteredFeatures.map(feature => ({
            productId: feature.productId.toString(),
            score: this.cosineSimilarity(vector, feature.vector)
        }))
            .sort((a, b) => b.score - a.score);

        // Hiển thị Log báo cáo ở Terminal
        console.log(`\n────────────────────────────────────────────────`);
        console.log(`📡 [AI VISUAL SEARCH REPORT]`);
        console.log(`🎯 Nhận diện danh mục: ${category_label} (${category.name})`);
        console.log(`📈 Top 5 sản phẩm tương đồng nhất:`);

        scoredResults.slice(0, 5).forEach((item, index) => {
            const pInfo = productsInCat.find(p => p._id.toString() === item.productId);
            const scorePercent = (item.score * 100).toFixed(2);
            console.log(`${index + 1}. [${scorePercent}%] - ${pInfo ? pInfo.productName : 'Sản phẩm ẩn'}`);
        });
        console.log(`────────────────────────────────────────────────\n`);

        // Lấy Top 10 kết quả
        const top10Results = scoredResults.slice(0, 10);
        const resultIds = top10Results.map(item => item.productId);

        // BƯỚC 5: Lấy thông tin chi tiết sản phẩm cuối cùng
        const products = await Product.find({ _id: { $in: resultIds } }).lean();

        // Sắp xếp lại danh sách sản phẩm theo thứ tự điểm số từ cao xuống thấp
        const sortedProducts = top10Results.map(result => {
            return products.find(p => p._id.toString() === result.productId);
        }).filter(Boolean);

        return {
            products: sortedProducts,
            categoryName: category.name
        };
    }
};

module.exports = { SearchService };