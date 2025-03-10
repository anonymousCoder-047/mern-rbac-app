
// loading user model
const { Profile } = require('../models/Profile');
const { ObjectId } = require("mongodb");

class ProfileServices {
    async create(_profile) {
        return await Profile.create(_profile);
    }

    async update_profile(_profile_id, _profile) {
        return await Profile.findOneAndUpdate({ _id: typeof _profile_id == 'object' ? _profile_id : ObjectId.createFromHexString(_profile_id) }, { $set: _profile });
    }

    async delete_profile(_profile_id) {
        return await Profile.deleteOne({ _id: typeof _profile_id == 'object' ? _profile_id : ObjectId.createFromHexString(_profile_id) });
    }

    async get_profile_by_id(_profile_id) {
        return await Profile.findById({ _id: typeof _profile_id == 'object' ? _profile_id : ObjectId.createFromHexString(_profile_id) });
    }

    async get_profile(_filters={}) {
        return await Profile.find({..._filters}).populate({ path: 'roleId', model: 'role' }).populate({ path: 'groupId', model: 'group' });
    }
}

module.exports = new ProfileServices();