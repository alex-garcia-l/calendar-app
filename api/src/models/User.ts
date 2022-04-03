import { Schema, model } from 'mongoose';

const config = { timestamps: true, versionKey: false };

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  config
);

UserSchema.methods.toJSON = function () {
  let { password, _id, ...data } = this.toObject();

  data = {
    uid: _id,
    ...data,
  };

  return data;
};

export default model('User', UserSchema);
