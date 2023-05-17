const catchAsync = require('../utilis/catchAsync');
const AppError = require('../utilis/appError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((elem) => {
    if (allowedFields.includes(elem)) newObj[elem] = obj[elem];
  });

  return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route not implemented yet,please use signup',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('this route is not for password updates', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
