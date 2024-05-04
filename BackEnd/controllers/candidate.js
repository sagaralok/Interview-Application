const { validationResult } = require("express-validator/check");
const mongoose = require("mongoose");
const Candidate = require("../models/candidate");
const Admin = require("../models/admin");

exports.getCandidates = (req, res, next) => {
  Candidate.find({ interviewer: new mongoose.Types.ObjectId(req.userId) })
    .then((candidates) => {
      res.status(200).json({
        message: "Fetched candidates successfully.",
        candidates: candidates,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createCandidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }

  const name = req.body.name;
  const status = req.body.status;
  const feedback = req.body.feedback;
  const rating = req.body.rating;
  let interviewer;
  const candidate = new Candidate({
    name: name,
    status: status,
    feedback: feedback,
    rating: rating,
    interviewer: req.userId,
  });
  candidate
    .save()
    .then((result) => {
      return Admin.findById(req.userId);
    })
    .then((user) => {
      interviewer = user;
      user.candidates.push(candidate);
      return user.save();
    })
    
    .then((result) => {
      res.status(201).json({
        message: "Candidate created successfully!",
        candidate: candidate,
        creator: { _id: interviewer._id, name: interviewer.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateCandidate = (req, res, next) => {
  const candidateId = req.params.candidateId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const status = req.body.status;
  const feedback = req.body.feedback;
  const rating = req.body.rating;
  Candidate.findById(candidateId)
    .then((candidate) => {
      if (!candidate) {
        const error = new Error("Could not find candidate.");
        error.statusCode = 404;
        throw error;
      }
      if (candidate.interviewer.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }
      candidate.name = name;
      candidate.status = status;
      candidate.feedback = feedback;
      candidate.rating = rating;

      return candidate.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Candidate updated!", candidate: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteCandidate = (req, res, next) => {
  const candidateId = req.params.candidateId;
  Candidate.findById(candidateId)
    .then((candidate) => {
      if (!candidate) {
        const error = new Error("Could not find candidate.");
        error.statusCode = 404;
        throw error;
      }
      if (candidate.interviewer.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }

      return Candidate.findByIdAndRemove(candidateId);
    })
    .then((result) => {
      return Admin.findById(req.userId);
    })
    .then((user) => {
      user.candidates.pull(candidateId);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted candidate." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
