const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Đảm bảo đường dẫn này trỏ đúng vào file search.service.js vừa sửa ở trên
const { SearchService } = require('../src/services/searchService');
const Product = require('../src/models/Product');
const ProductFeature = require('../src/models/ProductFeature');

async function runIndexing() {
    try {
        // Thay chuỗi kết nối nếu DB của bạn có mật khẩu hoặc tên khác
        await mongoose.connect('mongodb+srv://admin:12345@cluster0.jfagf8r.mongodb.net/LightStore?appName=Cluster0');
        console.log("🚀 Đã kết nối Database thành công!");

        const products = await Product.find({});
        console.log(`🔍 Đang bắt đầu xử lý ${products.length} sản phẩm...`);

        for (let i = 0; i < products.length; i++) {
            const p = products[i];

            // Tạo file tạm từ Base64
            const base64Data = p.imageUrl.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            const tempFilePath = path.join(__dirname, `temp_${p._id}.jpg`);

            fs.writeFileSync(tempFilePath, buffer);

            try {
                const vector = await SearchService.getVector(tempFilePath);

                await ProductFeature.findOneAndUpdate(
                    { productId: p._id },
                    { vector: vector },
                    { upsert: true }
                );

                console.log(`[${i + 1}/${products.length}] ✅ Thành công: ${p.productName}`);
            } catch (err) {
                console.error(`❌ Lỗi tại SP ${p.productName}:`, err.message);
            } finally {
                if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
            }
        }

        console.log("✨ TẤT CẢ ĐÃ XỬ LÝ XONG!");
        process.exit(0);
    } catch (error) {
        console.error("🔥 Lỗi nghiêm trọng:", error);
        process.exit(1);
    }
}

runIndexing();