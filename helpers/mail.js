
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const ejs = require('ejs');
const path = require('path');
const axios = require('axios');
const inlineCss = require('inline-css');

// defining or loading any configurations for any modules
const { 
    mail_host,
    mail_port,
    mail_secure,
    mail_username,
    mail_password,
    css_url,
} = require('../config/config');

const transporter = nodemailer.createTransport(smtpTransport({
    host: mail_host,
    port: mail_port,
    secure: mail_secure, // true for port 465, false for other ports
    auth: {
      user: mail_username,
      pass: mail_password,
    },
}));


// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

// Function to fetch CSS from external URL
async function fetchCSSANDApplyInline(url, _content_type, htmlContent) {
  try {
    // Fetch the CSS content
    const response = await axios.get(url);
    
    // If the content is CSS, inject it inside a <style> tag
    const cssContent = _content_type == 'css' ? `<style>${response.data}</style>` : '';
    
    // Apply inline CSS to the HTML content
    let htmlWithCSS = htmlContent + cssContent;

    const htmlWithInlineCSS = await inlineCss(htmlWithCSS, {
      url: ' ', // required for some URLs to be correctly resolved
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: false, // Keep the <style> tags for fallback
    });

    return htmlWithInlineCSS; // Return the HTML with inline CSS applied
  } catch (error) {
    console.error('Error fetching CSS:', error);
    return htmlContent; // Return the original HTML content in case of an error
  }
}

let send_mail = (async (_template_name, _template_data, _from, _to, _subject, _attachments=[]) => {
  try {
    // Path to the EJS template file
    // Render the EJS template to HTML
    const templatePath = path.join(__dirname, '../templates', `${_template_name}.ejs`);    
    const htmlContent = await ejs.renderFile(templatePath, _template_data);
    const inline_html_content = await fetchCSSANDApplyInline(css_url, "css", htmlContent); 

    const mail_options = {
        from: _from,
        to: _to,
        subject: _subject,
        html: inline_html_content,
        attachments: _attachments
    }

    const info = await transporter.sendMail(mail_options);

    if(info.accepted?.length > 0) return { "status": 200, "message": "Mail delivered successfully.", "messageId": info?.messageId, "envelope": info?.envelope };
    else if(info.pending?.length > 0) return { "status": 403, "message": "Pending to deliver mail.", "messageId": info?.messageId, "envelope": info?.envelope };
    else if(info.rejected?.length > 0) return { "status": 400, "message": "Something went wrong.", "messageId": info?.messageId, "envelope": info?.envelope };
    else return { "status": 500, "message": "Error! something went wrong while sending mail.", "messageId": info?.messageId, "envelope": info?.envelope, "data": info };
  } catch(ex) {
    console.log("Error! something went wrong while sending email E: ", ex);

    return {};
  }
})

module.exports = {
  send_mail: send_mail
};