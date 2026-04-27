const Supplier = require('../models/Supplier');

const createSupplier = async (data) => {
    const existing = await Supplier.findOne({ name: data.name });
    if (existing) throw new Error("Tên nhà cung cấp này đã tồn tại!");
    return await Supplier.create(data);
};

const getAllSuppliers = async (options = {}) => {
    const search = options.search ? options.search.trim() : '';
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.max(1, parseInt(options.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: new RegExp(search, 'i') } },
            { phone: { $regex: new RegExp(search, 'i') } }
        ];
    }

    const [suppliers, totalSuppliers] = await Promise.all([
        Supplier.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Supplier.countDocuments(filter)
    ]);

    return {
        suppliers,
        pagination: {
            totalSuppliers,
            totalPages: Math.ceil(totalSuppliers / limit),
            currentPage: page,
            limit
        }
    };
};

const updateSupplier = async (id, data) => {
    return await Supplier.findByIdAndUpdate(id, data, { new: true });
};

const deleteSupplier = async (id) => {
    return await Supplier.findByIdAndDelete(id);
};

module.exports = { createSupplier, getAllSuppliers, updateSupplier, deleteSupplier };