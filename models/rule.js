const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    rule: {
        field: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true
        },
        condition_value: {
            type: String,
            required: true

        },
      
    }})

module.exports = mongoose.model('Rule', ruleSchema);
