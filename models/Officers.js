const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;


var Officers = new Schema({
    discordId: SchemaTypes.Long,
    totalSuspensions: Number,
    currentSuspensions: Number
}, {
    collection: 'officers'
});

module.exports = mongoose.model('Officers', Officers);