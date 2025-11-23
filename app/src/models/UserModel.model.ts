import mongoose,  { Schema, Model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
},{
    timestamps: true
});

export const UserModel: Model<IUser>  = mongoose.model<IUser>("User", userSchema);







