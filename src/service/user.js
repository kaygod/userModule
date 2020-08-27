const User = require('../models/user');
const { delProp } = require('../utils/tool');

/**
 * 判断用户是否存在
 */
exports.userIsExist = async ({
  user_name = null,
  password = null,
  user_id = null,
  email = null,
  verify_key = null,
  status = null,
}) => {
  const whereOption = {};
  let require = false;
  if (user_name !== null) {
    whereOption['user_name'] = user_name;
    require = true;
  }
  if (verify_key !== null) {
    whereOption['verify_key'] = verify_key;
    require = true;
  }
  if (password !== null) {
    whereOption['password'] = password;
  }
  if (user_id !== null) {
    whereOption['user_id'] = user_id;
    require = true;
  }
  if (email !== null) {
    whereOption['email'] = email;
    require = true;
  }
  if (status !== null) {
    whereOption['status'] = status;
    require = true;
  }
  if (require === false) {
    return null;
  }
  const result = await User.findOne({
    where: whereOption,
    attributes: ['user_id', 'user_name', 'status'],
  });
  if (result == null) {
    return result;
  }
  return result.dataValues;
};

/**
 * 增加一条用户数据
 */
exports.addUser = async ({ user_name, password, email, verify_key }) => {
  const result = await User.create({
    user_id: null,
    user_name,
    password,
    email,
    status: 1,
    verify_key,
  });
  const data = result.dataValues;
  delProp(data, 'password');
  return data;
};

/**
 * 更新用户信息
 */
exports.updateUserInfo = async ({
  user_id,
  new_password,
  verify_key,
  status,
  avatar,
  info,
  email,
}) => {
  const option = {};
  if (new_password !== null) {
    option['password'] = new_password;
  }
  if (verify_key !== null) {
    option['verify_key'] = verify_key;
  }
  if (status !== null) {
    option['status'] = status;
  }
  if (avatar !== null) {
    option['avatar'] = avatar;
  }
  if (info !== null) {
    option['info'] = info;
  }
  if (email !== null) {
    option['email'] = email;
  }

  const result = await User.update(option, {
    where: {
      user_id,
    },
  });

  return result[0] > 0;
};
