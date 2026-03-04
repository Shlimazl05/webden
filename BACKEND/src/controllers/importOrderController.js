const importOrderService = require('../services/importOrderService');

exports.createOrder = async (req, res) => {
    try {
        const order = await importOrderService.createImportOrder(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const result = await importOrderService.getAllOrders(req.query);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};