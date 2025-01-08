
// loading user model
const { Users } = require('../models/Users');

class UserServices {
    async create(_user) {
        return await Users.create(_user);
    }

    async update_user(_user_id, _user) {
        return await Users.findOneAndUpdate({ _id: _user_id }, { $set: _user });
    }

    async delete_user(_user_id) {
        return await Users.deleteOne({ _id: _user_id });
    }

    async get_user_by_id(_user_id) {
        return await Users.findById({ _id: _user_id });
    }

    async get_users(_filters={}) {
        return await Users.find({..._filters});
    }
}

module.exports = new UserServices();