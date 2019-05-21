const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;


var ServerSettings = new Schema({
    ServerID: SchemaTypes.Long,
    Prefix: String,
    ModLog: String,
    ModRole: String,
    AdminRole: String,
    SystemNotice: String,
    WelcomeChannel: String,
    WelcomeMessage: String,
    WelcomeActive: String,
    MaxSuspensions: Number
}, {
    collection: 'servers'
});

module.exports = mongoose.model('Server', ServerSettings);