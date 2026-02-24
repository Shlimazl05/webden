const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Customer'], default: 'Customer' },
    status: { type: Number, default: 1 } // 1: Hoạt động, 0: Bị chặn
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);