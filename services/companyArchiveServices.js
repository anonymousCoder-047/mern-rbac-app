
// loading user model
const { CompanyArchive} = require('../models/CompanyArchive');
const { ObjectId } = require("mongodb");

class CompanyArchiveServices {
    async create(_company_archive) {
        return await CompanyArchive.create(_company_archive);
    }

    async update_company_archive(_company_archive_id, _company_archive) {
        return await CompanyArchive.findOneAndUpdate({ _id: typeof _company_archive_id == 'object' ? _company_archive_id : ObjectId.createFromHexString(_company_archive_id) }, { $set: _company_archive });
    }

    async delete_company_archive(_company_archive_id) {
        return await CompanyArchive.deleteOne({ _id: typeof _company_archive_id == 'object' ? _company_archive_id : ObjectId.createFromHexString(_company_archive_id) });
    }

    async delete_Many(_filters={}) {
        return await CompanyArchive.deleteMany({..._filters});
    }

    async get_company_archive_by_id(_company_archive_id) {
        return await CompanyArchive.findById({ _id: typeof _company_archive_id == 'object' ? _company_archive_id : ObjectId.createFromHexString(_company_archive_id) });
    }

    async get_company_archive(_filters={}) {
        return await CompanyArchive.find({..._filters})
        .populate({ path: 'profileId', model: 'profile' })
        .populate({ path: 'groupId', model: 'group', populate: [
            { path: 'group_manager', model: 'users' }
        ]})
    }
}

module.exports = new CompanyArchiveServices();