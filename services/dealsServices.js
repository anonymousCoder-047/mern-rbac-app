
// loading user model
const { Deals } = require('../models/Deals');
const { ObjectId } = require("mongodb");

class DealsServices {
    async create(_deals) {
        return await Deals.create(_deals);
    }

    async update_deals(_deals_id, _deals) {
        return await Deals.findOneAndUpdate({ _id: typeof _deals_id == 'object' ? _deals_id : ObjectId.createFromHexString(_deals_id) }, { $set: _deals });
    }

    async delete_deals(_deals_id) {
        return await Deals.deleteOne({ _id: typeof _deals_id == 'object' ? _deals_id : ObjectId.createFromHexString(_deals_id) });
    }

    async delete_Many(_filters={}) {
        return await Deals.deleteMany({..._filters});
    }

    async get_deals_by_id(_deals_id) {
        return await Deals.findById({ _id: typeof _deals_id == 'object' ? _deals_id : ObjectId.createFromHexString(_deals_id) })
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'team_leader', model: 'profile' });
    }

    async get_deals(_filters={}) {
        return await Deals.find({..._filters})
        .populate({ path: 'product_category', model: 'category' })
        .populate({ path: 'team_leader', model: 'profile' });
    }
}

module.exports = new DealsServices();