


const ProductFeature = require('../models/ProductFeature');
const Product = require('../models/Product');
const Category = require('../models/Category');
const aiClient = require('../utils/aiClient');

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
    // 1. Tính Cosine Similarity
    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0, normA = 0, normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
        return isNaN(similarity) ? 0 : similarity;
    },

    // 2. Gọi AI lấy Vector
    async getVector(imagePath) {
        try {
            const response = await aiClient.post('/predict', { path: imagePath });
            return response.data;
        } catch (error) {
            console.error(" Lỗi khi gọi AI Server:", error.message);
            throw new Error("Không thể kết nối với hệ thống nhận diện.");
        }
    },

    // 3. Tìm kiếm và xử lý logic nhận diện
    async findSimilarProducts(aiData) {
        const { vector, category_label } = aiData;
        const SIMILARITY_THRESHOLD = 0.45; // Ngưỡng chặn ảnh không liên quan

        // BƯỚC 1: Tìm Category ID dựa trên nhãn AI trả về
        const targetSlug = CATEGORY_MAPPING[category_label];
        const category = await Category.findOne({ slug: targetSlug });

        if (!category) {
            console.error(` AI nhận diện loại: ${category_label} nhưng không tìm thấy slug: ${targetSlug} trong DB`);
            return { success: false, message: "Không nhận diện được loại sản phẩm này.", products: [] };
        }

        // BƯỚC 2: Tìm tất cả sản phẩm Active thuộc danh mục này
        const productsInCat = await Product.find({
            categoryId: category._id,
            status: 'Active'
        }).select('_id productName').lean();

        if (productsInCat.length === 0) {
            return { success: false, message: `Danh mục ${category.name} hiện chưa có sản phẩm.`, products: [] };
        }

        const validProductIds = productsInCat.map(p => p._id.toString());

        // BƯỚC 3: Tính toán độ tương đồng cho tất cả sản phẩm trong danh mục
        const filteredFeatures = await ProductFeature.find({
            productId: { $in: validProductIds }
        });

        const scoredResults = filteredFeatures.map(feature => ({
            productId: feature.productId.toString(),
            score: this.cosineSimilarity(vector, feature.vector)
        }))
            .sort((a, b) => b.score - a.score); // Sắp xếp giảm dần theo điểm số

        // ============================================================
        //  HIỂN THỊ CHỈ SỐ TƯƠNG ĐỒNG Ở TERMINAL
        // ============================================================
        if (scoredResults.length > 0) {
            console.log(`\n────────────────────────────────────────────────`);
            console.log(`[AI VISUAL SEARCH REPORT]`);
            console.log(` Nhận diện danh mục: ${category_label} (${category.name})`);
            console.log(`Top 5 sản phẩm tương đồng nhất:`);

            scoredResults.slice(0, 10).forEach((item, index) => {
                const pInfo = productsInCat.find(p => p._id.toString() === item.productId);
                const scorePercent = (item.score * 100).toFixed(2);
                console.log(`${index + 1}. [${scorePercent}%] - ${pInfo ? pInfo.productName : 'Sản phẩm ẩn'}`);
            });
            console.log(`────────────────────────────────────────────────\n`);
        }
        // ============================================================

        //  KIỂM TRA NGƯỠNG TIN CẬY (Sau khi đã log để debug)
        if (scoredResults.length === 0 || scoredResults[0].score < SIMILARITY_THRESHOLD) {
            console.log(`⚠️ Ảnh bị chặn do không đủ độ tin cậy (Max score: ${scoredResults[0]?.score.toFixed(4)})`);
            return {
                success: false,
                message: "Không tìm thấy sản phẩm nào tương đồng với ảnh bạn cung cấp.",
                products: []
            };
        }

        // BƯỚC 4: Lấy Top 10 kết quả trả về cho Frontend
        const top10Results = scoredResults.slice(0, 10);
        const resultIds = top10Results.map(item => item.productId);
        const products = await Product.find({ _id: { $in: resultIds } }).lean();

        // Sắp xếp lại danh sách sản phẩm theo thứ tự điểm số
        const sortedProducts = top10Results.map(result => {
            return products.find(p => p._id.toString() === result.productId);
        }).filter(Boolean);

        return {
            success: true,
            message: `Tìm thấy các sản phẩm thuộc dòng ${category.name}`,
            products: sortedProducts,
            categoryName: category.name
        };
    }
};

module.exports = { SearchService };