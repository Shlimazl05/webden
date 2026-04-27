// const Shipping = require('../models/Shipping');

// const shippingService = {
//     // Lấy danh sách sắp xếp theo tiền đơn hàng từ thấp đến cao
//     getAllRules: async () => {
//         return await Shipping.find().sort({ minAmount: 1 });
//     },

//     createRule: async (data) => {
//         const newRule = new Shipping(data);
//         return await newRule.save();
//     },

//     deleteRule: async (id) => {
//         return await Shipping.findByIdAndDelete(id);
//     }
// };

// module.exports = shippingService;

// D:\webden\BACKEND\src\services\shippingService.js
const Shipping = require('../models/Shipping');

const shippingService = {
    // Lấy danh sách sắp xếp theo tiền đơn hàng từ thấp đến cao
    getAllRules: async () => {
        return await Shipping.find().sort({ minAmount: 1 });
    },

    createRule: async (data) => {
        const newRule = new Shipping(data);
        return await newRule.save();
    },

    // --- HÀM MỚI BỔ SUNG ---
    updateRule: async (id, data) => {
        // findByIdAndUpdate: Tìm theo ID và cập nhật dữ liệu mới
        // { new: true }: Trả về dữ liệu bản ghi SAU KHI đã cập nhật (để hiển thị lên UI ngay)
        const updatedRule = await Shipping.findByIdAndUpdate(id, data, { new: true });

        if (!updatedRule) {
            throw new Error('Không tìm thấy cấu hình phí ship để cập nhật');
        }

        return updatedRule;
    },

    deleteRule: async (id) => {
        return await Shipping.findByIdAndDelete(id);
    }
};

module.exports = shippingService;