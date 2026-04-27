const mongoose = require('mongoose');

const ImportDetailSchema = new mongoose.Schema({
    // Thuộc hóa đơn nhập nào
    importOrderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ImportOrder', 
        required: true 
    },

    // Sản phẩm nào được nhập
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },

    // Số lượng nhập thêm
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },

    // Giá vốn mua vào tại thời điểm nhập
    importPrice: { 
        type: Number, 
        required: true 
    },

    // Giá bán mới (Nếu muốn cập nhật lại giá niêm yết trên Web)
    newSalePrice: { 
        type: Number 
    },

    // Thành tiền của dòng hàng này (quantity * importPrice)
    subTotal: { 
        type: Number, 
        required: true 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('ImportDetail', ImportDetailSchema);