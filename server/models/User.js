const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
});

const User = model('User', UserSchema);

module.exports = User;