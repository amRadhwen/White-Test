const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


//check passwords match
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//encrypt password before save
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports.User = model("User", userSchema);
