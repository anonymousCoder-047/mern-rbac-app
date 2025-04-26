
// loading user model
const { Contacts } = require('../models/Contacts');
const { ObjectId } = require("mongodb");

class ContactsServices {
    async create(_contacts) {
        return await Contacts.create(_contacts);
    }

    async update_contacts(_contacts_id, _contacts) {
        return await Contacts.findOneAndUpdate({ _id: typeof _contacts_id == 'object' ? _contacts_id : ObjectId.createFromHexString(_contacts_id) }, { $set: _contacts });
    }

    async delete_contacts(_contacts_id) {
        return await Contacts.deleteOne({ _id: typeof _contacts_id == 'object' ? _contacts_id : ObjectId.createFromHexString(_contacts_id) });
    }

    async delete_Many(_filters={}) {
        return await Contacts.deleteMany({..._filters});
    }

    async get_contacts_by_id(_contacts_id) {
        return await Contacts.findById({ _id: typeof _contacts_id == 'object' ? _contacts_id : ObjectId.createFromHexString(_contacts_id) })
        .populate({ path: 'company_name', model: 'company' });
    }

    async get_contacts(_filters={}) {
        return await Contacts.find({..._filters})
        .populate({ path: 'company_name', model: 'company' });
    }
}

module.exports = new ContactsServices();