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

    deleteRule: async (id) => {
        return await Shipping.findByIdAndDelete(id);
    }
};

module.exports = shippingService;