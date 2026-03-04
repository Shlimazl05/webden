const mongoose = require('mongoose');

const ImportOrderSchema = new mongoose.Schema({
    // Mã phiếu nhập (Tự động sinh: PN-001, PN-002...)
    importCode: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Ngày nhập hàng
    importDate: { 
        type: Date, 
        default: Date.now 
    },

    // Nhân viên thực hiện nhập kho (Liên kết với bảng User/Employee)
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    // Nhà cung cấp hàng hóa (Liên kết với bảng Supplier)
    supplierId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier', 
        required: true 
    },

    // Tổng giá trị tiền hàng của cả hóa đơn
    totalAmount: { 
        type: Number, 
        default: 0 
    },

    // Trạng thái phiếu nhập
    status: { 
        type: String, 
        enum: ['Draft', 'Completed', 'Cancelled'], 
        default: 'Completed' 
    },

    // Ghi chú thêm
    note: { 
        type: String 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('ImportOrder', ImportOrderSchema);