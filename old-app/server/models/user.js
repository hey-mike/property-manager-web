const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  nikename: String,
  bio: String
}, {
  timestamps: true
});


userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      this.updatedAt = Date.now();
      next();
    });
  });
});

userSchema.methods.authenticate = function (password, cb) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.name = function () {
  return this.displayName || this.username;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
