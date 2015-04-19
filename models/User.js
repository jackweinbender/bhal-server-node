var mongoose = require('mongoose');

var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 12;

var Schema = mongoose.Schema;


/* The Schema */

var userSchema = new Schema({
  // Properties
  email: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true
  },
  authTokens: {
    facebook: String,
    github: String,
    google: String
  },
  role: String,
  // Relational properties

  // Timestamp info
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});


/* Password Hash and Verification */
userSchema.pre('save', function(next) {
  var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
          });
      });
  });


module.exports = mongoose.model('User', userSchema);
