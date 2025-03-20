
// loading user model
const { Tax } = require('../models/Tax');
const { ObjectId } = require("mongodb");

class TaxServices {
    async create(_tax) {
        return await Tax.create(_tax);
    }

    async update_tax(_tax_id, _tax) {
        return await Tax.findOneAndUpdate({ _id: typeof _tax_id == 'object' ? _tax_id : ObjectId.createFromHexString(_tax_id) }, { $set: _tax });
    }

    async delete_tax(_tax_id) {
        return await Tax.deleteOne({ _id: typeof _tax_id == 'object' ? _tax_id : ObjectId.createFromHexString(_tax_id) });
    }

    async delete_Many(_filters={}) {
        return await Tax.deleteMany({..._filters});
    }

    async get_tax_by_id(_tax_id) {
        return await Tax.findById({ _id: typeof _tax_id == 'object' ? _tax_id : ObjectId.createFromHexString(_tax_id) });
    }

    async get_tax(_filters={}) {
        return await Tax.find({..._filters});
    }
}

module.exports = new TaxServices();