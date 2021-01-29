const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    data: {
        name: {
            type: String,
            required: true,
        },
        crew: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        missions: {
            type: String,
            required: true
        }
     
    }  
});

module.exports = mongoose.model('Data', dataSchema);