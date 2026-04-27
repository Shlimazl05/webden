const mongoose = require('mongoose');
const ProductFeatureSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    vector: { type: [Number], required: true }
});
module.exports = mongoose.model('ProductFeature', ProductFeatureSchema);