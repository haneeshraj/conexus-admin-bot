const Warn = require("../models/userWarnModel.js");

// @desc    Shows all the warns
// @route   GET /api/warns
// @access  Public

const getWarns = async (req, res) => {
  try {
    const warns = await Warn.find({});
    res.json(warns);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Deletes all warns
// @route   DELETE /api/warns
// @access  Public

const delWarns = async (req, res) => {
  try {
    await Warn.deleteMany({});
    res.json({ message: "All the warns have been deleted!" });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Add a warning
// @route   POST /api/warns/
// @access  Public

const addWarn = async (req, res) => {
  try {
    const { warnId, userId, reason } = req.body;

    const warnDetails = new Warn({
      warnId,
      userId,
      reason,
    });
    const createdWarn = await warnDetails.save();

    res.status(201).json(createdWarn);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Get a user warns
// @route   GET /api/warns/:userid
// @access  Public

const getWarnsByUserId = async (req, res) => {
  try {
    const userId = req.params.userid;
    const warns = await Warn.find({ userId });
    if (!warns.length) {
      res.json({ hasWarns: false, message: "No warns found!" });
      return;
    }
    res.json(warns);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Deleting warns of a user
// @route   GET /api/warns/:userid
// @access  Public

const deleteWarnsByUserId = async (req, res) => {
  try {
    const userId = req.params.userid;
    await Warn.deleteMany({ userId });
    res.json({ message: `Deleted all the warns of ${userId}` });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Delete a warn
// @route   GET /api/warns/warning/:warnid
// @access  Public

const deleteWarnByWarnId = async (req, res) => {
  try {
    const warnId = req.params.warnid;
    const warn = await Warn.findOne({ warnId });
    if (!warn) {
      res.json({ warnExist: false, message: "No warns found!" });
      return;
    }
    await Warn.deleteOne({ warnId });
    res.json({ message: `Deleted the warns of ${warnId}` });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Updating a warn
// @route   PATCH /api/warns/warning/:warnid
// @access  Public

const updateWarnByWarnId = async (req, res) => {
  try {
    const warnId = req.params.warnid;
    const check = await Warn.findOne({ warnId });
    if (!check) {
      res.json({ warnExist: false, message: "No warns found!" });
      return;
    }
    await Warn.updateOne({ warnId }, { reason: req.body.reason });
    const warn = await Warn.findOne({ warnId });
    res.json(warn);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Gettin a warn
// @route   GET /api/warns/warning/:warnid
// @access  Public

const getWarnByWarnId = async (req, res) => {
  try {
    const warnId = req.params.warnid;
    const warn = await Warn.findOne({ warnId });
    if (!warn) {
      res.json({
        warnExist: false,
        message: "No warns with that warn ID was found!",
      });
      return;
    }
    res.json(warn);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getWarns,
  delWarns,
  addWarn,
  getWarnsByUserId,
  deleteWarnsByUserId,
  deleteWarnByWarnId,
  updateWarnByWarnId,
  getWarnByWarnId,
};
