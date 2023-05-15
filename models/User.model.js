const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 2,
      maxlength: 25,
      // set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    profileImg: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      // validate: {
      // validator: value => value.endsWith('@gmail.com'),
      // message: 'Only gmail clients'
      // }
    },
    role: {
      type: String,
      enum: ['ADMIN', 'PLANNER', 'USER'],
      default: 'USER'
    },
    password: {
      type: String,
      required: true
    },

    // events: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Event'
    // }],

    // artist: [{
    //   type: Schema.Types.ObjectId,
    //     ref: 'Artist' 
    // }],

  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
