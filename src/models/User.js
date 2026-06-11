const mongoose = require("mongoose");

const UserSchema =
new mongoose.Schema({

  telegramId: String,

  username: String,

  firstName: String,

  subscriptions: [String]

});

module.exports =
mongoose.model("User", UserSchema);