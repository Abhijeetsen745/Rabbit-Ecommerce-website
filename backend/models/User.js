import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type: String,
        enum:['admin', 'customer'],
        default:'customer'
    }
},{timestamps:true})

//password hashing middleware
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();

})

//password validation middleware
userSchema.methods.matchPassword=async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password);
}

const User = mongoose.model('User', userSchema)

export default User;