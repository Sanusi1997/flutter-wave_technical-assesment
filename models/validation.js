const mongoose = require('mongoose')

const  validationSchema = new mongoose.Schema({
    validation: {
        error: {
            type: Boolean,
            default: true,
        },
        field: {
            type: String,
            required: true
        },
        field_value: {
            type: String
        },
        condition_value: {
            type: String,
            required: true
        }
     
    }  
});

module.exports = mongoose.model('Validation', validationSchema);