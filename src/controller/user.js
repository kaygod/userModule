const { addUser, userIsExist, updateUserInfo } = require('../service/user');
const { Success, Fail } = require('../models/Response');
const { md5, generateNumber } = require('../utils/tool');
const { v4: uuidv4 } = require('uuid');
const { sendRegisterEmail } = require('../provider/email');
const {
  userExist,
  emailExist,
  passwordError,
  updateUserError,
  keyUnValid,
  loginError,
  accountError,
  unvalidOperate,
} = require('../provider/error');

/**
 * 注册
 */
exports.register = async ({ user_name, password, email }) => {
  //判断用户是否存在
  const userInfo = await userIsExist({ user_name });
  if (userInfo !== null && userInfo.status !== 1) {
    //用户已存在
    return userExist();
  }
  //判断邮箱是否存在
  const emailInfo = await userIsExist({ email });
  if (emailInfo !== null && emailInfo.status !== 1) {
    //邮箱已存在
    return emailExist();
  }
  //生成邮箱校验码
  const verify_key = uuidv4();

  const data = userInfo || emailInfo;

  let result = null;

  if (data) {
    //已经存在用户数据了,但是该用户没有验证,所以重新发送一封邮件让用户验证
    await updateUserInfo({
      user_id: data.user_id,
      verify_key,
    });
    sendRegisterEmail({ user_id: data.user_id, email, verify_key }); //发送校验邮箱
  } else {
    //新增用户
    result = await addUser({
      user_name,
      password: md5(password),
      email,
      verify_key,
    });
    const { user_id, email: mail, verify_key: key } = result;
    sendRegisterEmail({ user_id, email: mail, verify_key: key }); //发送校验邮箱
  }
  return new Success(result);
};

/**
 * 注册时验证key值对不对
 * @param {*} param0
 */
exports.verifyKey = async ({ user_id, verify_key }) => {
  const userInfo = await userIsExist({ user_id, verify_key });
  if (userInfo === null) {
    return keyUnValid();
  }
  await updateUserInfo({
    verify_key: '',
    user_id,
    status: 0,
  });
  return new Success();
};
