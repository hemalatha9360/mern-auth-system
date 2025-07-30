const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"] },
});
module.exports = mongoose.model("Register", UserSchema);
