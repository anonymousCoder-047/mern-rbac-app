
// load dependencies
const path = require('path');
const _ = require('lodash');

// loading validators

const { canCreate, canRead, canUpdate, canDelete } = require('../middlewares/permissionMiddleware');

// loading database service
const { getNextSequence } = require('../helpers/incrementCount');
const { create, delete_contacts, get_contacts, get_contacts_by_id, update_contacts } = require('../services/contactsServices');

const apiResponse = require('../helpers/apiResponse');
const expressRouter = require('express');
const { send_mail } = require('../helpers/mail');
const { domain, mail_username } = require('../config/config');
const app = expressRouter.Router();

// load configuration variables

app.get('/view', canRead('read'), async (req, res) => {
    const contacts_data = await get_contacts({});

    if(!_.isEmpty(contacts_data)) return apiResponse.successResponseWithData(res, "Contacts information", contacts_data);
    else return apiResponse.ErrorResponse(res, "Sorry, no Contacts data exists");
});

app.post('/send-mail', canCreate('create'), async (req, res) => {
    let mail_data = req.body;

    if(!_.isEmpty(mail_data)) {
        const emailData = {
            url: domain,
            bodyData: mail_data?.emailBody,
            support_details: "https://wa.me/971505658506?text=Hello! i need your assistance to reset password for my account."
        };

        const _attachments = [
            {
                filename: 'the_a_team.png',
                path: path.join(__dirname, '../public/images/the_a_team.png'), // path to the image file
                cid: 'the_a_team_logo' // same as the cid used in the HTML img src
            }
        ]

        const _mail_info = await send_mail("contact_email", emailData, mail_username, mail_data?.toEmail, "Reset Password", _attachments, mail_data?.ccEmail ? mail_data?.ccEmail?.split(",") : [], mail_data?.bccEmail ? mail_data?.bccEmail?.split(",") : []);
        if(_mail_info.status == 200) return apiResponse.successResponseWithData(res, "Mail sent successfully.", _mail_info.messageId)
        else apiResponse.ErrorResponse(res, "Sorry! couldnt send Mail E: "+ _mail_info.status);
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", contacts_data);
});

app.post('/create', canCreate('create'), async (req, res) => {
    let contacts_data = req.body;

    if(!_.isEmpty(contacts_data)) {
        const [_existing_contacts] = await get_contacts({ email: contacts_data?.email });
        if(_.isEmpty(_existing_contacts)) { 
            contacts_data['id'] = await getNextSequence('contacts');
            const _new_contacts = await create(contacts_data);
    
            if(!_.isEmpty(_new_contacts)) return apiResponse.successResponseWithData(res, "New Contacts Created Successfully.", _new_contacts);
            else apiResponse.ErrorResponse(res, "Unable to create new contacts.");
        } else apiResponse.ErrorResponse(res, "Contacts already exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", contacts_data);
});

app.post('/update', canUpdate('update'), async (req, res) => {
    const contacts_data = req.body;

    if(!_.isEmpty(contacts_data)) {
        const _existing_contacts = await get_contacts_by_id(contacts_data?.id);
        if(!_.isEmpty(_existing_contacts)) {
            const _updated_contacts = await update_contacts(contacts_data?.id, _.omit(contacts_data, ['id']));
    
            if(!_.isEmpty(_updated_contacts)) return apiResponse.successResponseWithData(res, "Contacts Updated Successfully.", _updated_contacts);
            else apiResponse.ErrorResponse(res, "Unable to update contacts.");
        } else apiResponse.ErrorResponse(res, "Contacts doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", contacts_data);
});

app.patch('/update/:id', canUpdate('update'), async (req, res) => {
    const contacts_id = req.params.id;
    const contacts_data = req.body;

    if(!_.isEmpty(contacts_data) && contacts_id != "") {
        const _existing_contacts = await get_contacts_by_id(contacts_id);
        if(!_.isEmpty(_existing_contacts)) {            
            const _updated_contacts = await update_contacts(contacts_id, _.omit(contacts_data, ['id']));
    
            if(!_.isEmpty(_updated_contacts)) return apiResponse.successResponseWithData(res, "Contacts Updated Successfully.", _updated_contacts);
            else apiResponse.ErrorResponse(res, "Unable to update contacts.");
        } else apiResponse.ErrorResponse(res, "Contacts doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", contacts_data);
});

app.post('/delete', canDelete('delete'), async (req, res) => {
    const contacts_data = req.body;

    if(!_.isEmpty(contacts_data)) {
        const _existing_contacts = await get_contacts_by_id(contacts_data?.id);
        if(!_.isEmpty(_existing_contacts)) {
            const _deleted_contacts = await delete_contacts(contacts_data?.id);
    
            if(!_.isEmpty(_deleted_contacts)) return apiResponse.successResponseWithData(res, "Contacts Deleted Successfully.", _deleted_contacts);
            else apiResponse.ErrorResponse(res, "Unable to delete contacts.");
        } else apiResponse.ErrorResponse(res, "Contacts doesnot exists.");
    } else return apiResponse.badRequestResponse(res, "Sorry, missing field in body ", contacts_data);
});

module.exports.contactsController = app;