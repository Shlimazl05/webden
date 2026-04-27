const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import đúng service và model của bạn
const { SearchService } = require('../src/services/searchService');
const Product = require('../src/models/Product');
const ProductFeature = require('../src/models/ProductFeature');

async function runIndexing() {
    try {
        console.log(" Bắt đầu quá trình Re-index dữ liệu theo chuẩn AI mới...");

        // 1. Kết nối Database
        // Giữ nguyên connection string của bạn
        await mongoose.connect('mongodb+srv://admin:12345@cluster0.jfagf8r.mongodb.net/LightStore?appName=Cluster0');
        console.log(" Đã kết nối Database thành công!");

        // 2. Lấy tất cả sản phẩm
        const products = await Product.find({ status: 'Active' });
        console.log(` Tìm thấy ${products.length} sản phẩm cần cập nhật Vector.`);

        // 3. Vòng lặp xử lý
        for (let i = 0; i < products.length; i++) {
            const p = products[i];
            let tempFilePath = null;

            try {
                // Kiểm tra imageUrl có tồn tại không
                if (!p.imageUrl) {
                    console.warn(`⚠️ Bỏ qua SP ${p.productName} vì không có ảnh.`);
                    continue;
                }

                // Chuyển Base64 thành file tạm để Python đọc được
                const base64Data = p.imageUrl.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
                tempFilePath = path.join(__dirname, `temp_reindex_${p._id}.jpg`);
                fs.writeFileSync(tempFilePath, buffer);

                // GỌI AI: Lúc này SearchService sẽ gọi predict.py mới (có Resize 224 và Normalize)
                const aiData = await SearchService.getVector(tempFilePath);

                // CẬP NHẬT DATABASE
                // Chúng ta dùng findOneAndUpdate với upsert: true để đè dữ liệu cũ
                await ProductFeature.findOneAndUpdate(
                    { productId: p._id },
                    {
                        vector: aiData.vector,
                        // Lưu thêm nhãn để sau này tìm kiếm theo Category cho nhanh
                        label: aiData.category_label
                    },
                    { upsert: true, new: true }
                );

                console.log(`[${i + 1}/${products.length}]  Đã cập nhật chuẩn mới: ${p.productName}`);

            } catch (err) {
                console.error(` Lỗi tại SP ${p.productName}:`, err.message);
            } finally {
                // Xóa file tạm sau khi xong mỗi sản phẩm
                if (tempFilePath && fs.existsSync(tempFilePath)) {
                    fs.unlinkSync(tempFilePath);
                }
            }
        }

        console.log("\n✨ HOÀN THÀNH ĐỒNG BỘ DỮ LIỆU!");
        console.log("💡 Bây giờ tất cả sản phẩm trong DB đã có Vector chuẩn hóa (Normalize) và Resize 224x224.");
        console.log("🚀 Kết quả tìm kiếm của bạn sẽ chính xác hơn rất nhiều.");
        process.exit(0);

    } catch (error) {
        console.error("🔥 Lỗi nghiêm trọng trong quá trình Re-index:", error);
        process.exit(1);
    }
}

runIndexing();




