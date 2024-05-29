//Imports
import { Document, Model, ObjectId, Schema, model } from "mongoose";
import {genSalt, hash, compare} from "bcrypt";
import isEmail from "validator/lib/isEmail";

// User Interface init
export interface IUser extends Document {
    _id:        ObjectId | string,
    username:   string,
    password:   string,
    email:      string,
    settings:   IUSettings,
    createdAt:  Date | string,
    updatedAt:  Date | string
}

interface IUSettings
{
    theme: string,
    startDate: string,
}

// User Model interface init
export interface UserModel extends Model<IUser> {
    login(log: string, password:string): Promise<IUser>;
}

// Create userSchema
const userSchema = new Schema<IUser>({
    username: {type: String, required:true, unique:true, maxlength:24, minlength:3},
    email: {type: String, required: true, validate: isEmail},
    password: {type: String, required: true, minlength:5,maxlength:255},
}, {timestamps:true});

// Before create account, we hash the password
userSchema.pre<IUser>('save', async function(this: IUser, next) {
    const salt:string = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

// Login function to see if the password match.
userSchema.statics.login = async function (log:string, password:string)
{
    var user;

    if(isEmail(log))
        user = await userModel.findOne({email: log});
    
    user = await userModel.findOne({username: log});
    
    if (!user) 
        throw new Error("incorrect_log");

    const auth = await compare(password, user.password);
    if (!auth)
        throw new Error("incorrect_log");
    
    return user;
}

//default export.
const userModel = model<IUser, UserModel>('user', userSchema);
export default userModel;