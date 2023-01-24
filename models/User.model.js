const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    personalPhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
    ,
    favoritePhotos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
