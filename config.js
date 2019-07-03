// settings for local CouchDB
exports.db = 'http://127.0.0.1:5984/';
exports.dbname = 'http://127.0.0.1:5984/books';
// Se debe crear la DB a mano

//settings for email
exports.emailType = 'nodemailer-smtp-transport';
exports.emailSettings = {
    service: 'AWS SES',
    auth: {
        user: '',
        pass: ''
    }
};

// redirect target when requesting restricted page
exports.login = {
    route: '/login'};