
// loading user model
const { Users } = require('../models/Users');
const { ObjectId } = require("mongodb");

class UserServices {
    async create(_user) {
        return await Users.create(_user);
    }

    async update_user(_user_id, _user) {
        return await Users.findOneAndUpdate({ _id: typeof _user_id == 'object' ? _user_id : ObjectId.createFromHexString(_user_id) }, { $set: _user });
    }

    async delete_user(_user_id) {
        return await Users.deleteOne({ _id: typeof _user_id == 'object' ? _user_id : ObjectId.createFromHexString(_user_id) });
    }

    async get_user_by_id(_user_id) {
        return await Users.findById({ _id: typeof _user_id == 'object' ? _user_id : ObjectId.createFromHexString(_user_id) });
    }

    async get_users(_filters={}) {
        return await Users.find({..._filters})
        .populate({ path: 'profileId', model: 'profile', populate: [
            { path: 'groupId', model: 'group', populate: [{ path: 'group_manager', model: 'users' }]}
        ]})
    }
    
    async delete_Many(_filters={}) {
        return await Users.deleteMany({..._filters})
    }
}

module.exports = new UserServices();