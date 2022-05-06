const { Schema, model} = require('mongoose');

let autoReconnect = new Schema({
    Guild : {
        type: String,
        required: true
    },
    TextId : {
        type: String,
        required: true
    },
    VoiceId : {
        type: String,
        required: true
    }, 
});
module.exports = model('autoreconnect ', autoReconnect );