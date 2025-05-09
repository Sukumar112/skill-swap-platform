const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,  // Ensures that emails are unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Encrypt the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // only encrypt if password is modified
  this.password = await bcrypt.hash(this.password, 10); // Encrypt password with bcrypt
  next();
});

// Compare entered password with the stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // compare hashes
};

module.exports = mongoose.model('User', userSchema);
