const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A username is needed!"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "An email is needed"],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Choose a valid email"
      ]
    },
    password: {
      type: String,
      required: [true, "A password is needed!"],
      minLength: 1,
      match: [/^(?=.*[0-9]).{8,}$/, "Password must be 8 characters long and contain at least one number"]
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

userSchema.pre("save", function (next) {

  bcrypt
    .genSalt(+process.env.SALT)
    .then(salt => {
      let hashedPwd = bcrypt.hashSync(this.password, salt)
      this.password = hashedPwd
      next()
    })
    .catch(err => next(err))
})

const User = model("User", userSchema);

module.exports = User;
