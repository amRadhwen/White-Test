const { Schema, model } = require("mongoose");


const testSchema = new Schema({
    title : {
        type : String,
        unique: true,
        required: true
    },
    
    tags : {
        type: [String],
        required: true
    },
    date : {
        type: [Date],
        required: true,
        default: Date().now()
    },
    dispo: {
        type: Boolean,
        default: true
    }
});

module.exports.Test = model("Test", testSchema);