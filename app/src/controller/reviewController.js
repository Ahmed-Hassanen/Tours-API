const Review = require('../models/reviewModel');
// const catchAsync = require('../utilis/catchAsync');
const factory = require('./handlerFactory');

//const AppError = require('../utilis/appError');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);

exports.getAllReviews = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);
