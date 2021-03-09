const mongoose = require("mongoose");
const Log = require("./logModel");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Enter a valid email"],
  },
  password: { type: String, required: true, minLength: 5 },
  displayName: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
});

userSchema.post("findOneAndDelete", async (user) => {
  try {
    await Log.deleteMany({ authorId: user._id });
  } catch (err) {
    console.log(err);
  }
});

module.exports = User = mongoose.model("user", userSchema);
