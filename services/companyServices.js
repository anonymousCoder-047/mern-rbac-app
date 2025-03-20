
// loading user model
const { Company } = require('../models/Company');
const { ObjectId } = require("mongodb");

class CompanyServices {
    async create(_company) {
        return await Company.create(_company);
    }

    async update_company(_company_id, _company) {
        return await Company.findOneAndUpdate({ _id: typeof _company_id == 'object' ? _company_id : ObjectId.createFromHexString(_company_id) }, { $set: _company });
    }

    async delete_company(_company_id) {
        return await Company.deleteOne({ _id: typeof _company_id == 'object' ? _company_id : ObjectId.createFromHexString(_company_id) });
    }

    async delete_Many(_filters={}) {
        return await Company.deleteMany({..._filters});
    }

    async get_company_by_id(_company_id) {
        return await Company.findById({ _id: typeof _company_id == 'object' ? _company_id : ObjectId.createFromHexString(_company_id) });
    }

    async get_company(_filters={}) {
        return await Company.find({..._filters});
    }
}

module.exports = new CompanyServices();