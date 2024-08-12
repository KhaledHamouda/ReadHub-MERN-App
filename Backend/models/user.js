const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const usersSchema = new mongoose.Schema({
    firstName:{type : String , required :true},
    lastName:{type :String ,required:true},
    email:{type: String , unique:true,required:true, match:/.+@.+\.+/},
    password:{type: String , required: true},
    admin:{type:Boolean , required:true},
    
})

// Method to generate a JWT
usersSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, admin: this.admin }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

usersSchema.statics.findByCredentials = async (email, password) => {
    const user = await usersModel.findOne({ email });

    if (!user) {
        throw new Error('Unable to login. Email or password might be wrong!');
    }
    
    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
        throw new Error('Unable to login. Email or password might be wrong!');
    }

    return user;
};

const usersModel= mongoose.model('user',usersSchema);

module.exports=usersModel;