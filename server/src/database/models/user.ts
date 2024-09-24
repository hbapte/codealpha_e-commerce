// src\database\models\user.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
    names: string;
    email: string;
    role: string;
    password: string;
    emailVerified: boolean;
    emailVerificationToken: string;
    emailVerificationTokenCreated: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const userSchema: Schema = new Schema({
    names: { type: String, required: true},
    role: { type: String, default: 'user' },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationTokenCreated: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
      
});



const User: Model<User> = mongoose.model<User>("User", userSchema);

export default User;
