const { Fail } = require('../models/Response');

/**
 * 非法操作
 */
exports.unvalidOperate = () => {
  return new Fail(1, '非法操作!');
};

/**
 * 用户模块错误码
 *
 *  100 - 200
 *
 */
exports.userExist = () => {
  return new Fail(100, '用户已存在!');
};

exports.emailExist = () => {
  return new Fail(101, '邮箱已存在!');
};

exports.keyUnValid = () => {
  return new Fail(102, '校验码是无效的');
};

exports.loginError = () => {
  return new Fail(103, '用户名或者密码错误');
};

exports.accountError = () => {
  return new Fail(104, '账户异常无法登陆');
};

exports.passwordError = () => {
  return new Fail(105, '密码错误');
};

exports.updateUserError = () => {
  return new Fail(106, '更新用户信息失败');
};

exports.tokenError = () => {
  return new Fail(107, 'token不合法');
};

exports.tokenExpire = () => {
  return new Fail(108, 'token已过期');
};
