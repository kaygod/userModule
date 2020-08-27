const { Integer, String, Date, Boolean, Text } = require('../utils/types');
const seq = require('../utils/seq');

const User = seq.define('user', {
  user_id: {
    type: Integer.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: String(30),
    allowNull: false,
  },
  password: {
    type: String(60),
    allowNull: false,
  },
  avatar: {
    type: String(250),
    allowNull: true,
  },
  info: {
    type: String(100),
    allowNull: true,
  },
  email: {
    type: String(60),
    allowNull: false,
  },
  verify_key: {
    type: String(250),
    allowNull: true,
  },
  status: {
    type: Integer(1).UNSIGNED,
    allowNull: false,
  },
});

module.exports = User;
