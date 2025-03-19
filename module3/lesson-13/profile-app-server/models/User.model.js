const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    campus: {
      type: String,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Mexico", "Sao Paulo"],
    },
    course: {
      type: String,
      enum: ["Web Development", "UX/UI", "Data Analytics"],
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dv7hswv6b/image/upload/v1617224967/default-user-image.png",
    },
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
