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
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80"
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
