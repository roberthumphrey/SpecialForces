const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;


var Command = new Schema({
    discordId: SchemaTypes.Long,
    robloxUser: String,
    userId: Number,
    aura: Number
}, {
    collection: 'command'
});

module.exports = mongoose.model('Command', Command);