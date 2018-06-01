const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    bio: String
  },
  {
    timestamps: true
  }
);

// Set the 'fullname' virtual property
userSchema
  .virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });
userSchema.set('toJSON', {
  getters: true,
  virtuals: false
});

const saltRounds = 10;
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
    user.password = hashedPassword;
    user.updatedAt = Date.now();
  });

  next();
});

userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.name = function() {
  return this.displayName || this.username;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
