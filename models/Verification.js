const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;


var Verification = new Schema({
    discordId: SchemaTypes.Long,
    robloxUser: String,
    userId: Number,
    verCode: String
}, {
    collection: 'verification'
});

module.exports = mongoose.model('Verification', Verification);