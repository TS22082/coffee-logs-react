const mongoose = require("mongoose");
const User = require("../models/userModel");
const Log = require("../models/logModel");
const Confirm = require("../models/confirmModel");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/coffee-logs",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  async (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
    try {
      await User.deleteMany({});
      await Log.deleteMany({});
      await Confirm.deleteMany({});
      console.log("db reset");
      await mongoose.connection.close();
      console.log("MongoDB disconnected");
      process.exit(0);
    } catch (err) {
      console.log(err);
    }
  }
);
