import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  nom: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  date_naiss: {
    type: String,
    required: [true, 'Username is required!'],
  },
  role: {
    type: String,
  },
  salaire:{
    type: Number,
  }
});

const User = models.User || model("User", UserSchema);

export default User;