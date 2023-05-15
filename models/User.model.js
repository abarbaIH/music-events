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
      type: String,
      default: 'https://previews.123rf.com/images/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de.jpg'
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

    favoriteArtists: [{
            type: String,
            default: []
        }],

  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema);

module.exports = User;
