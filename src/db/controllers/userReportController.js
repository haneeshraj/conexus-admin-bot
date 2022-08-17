const UserReport = require("../models/userReportModel.js");

// @desc    Gets all reports
// @route   GET /api/user-reports
// @access  Public

const getAllUserReports = async (req, res) => {
  try {
    const reports = await UserReport.find({});
    res.json(reports);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Adds a report
// @route   POST /api/user-reports
// @access  Public

const addUserReport = async (req, res) => {
  try {
    const { reportId, userId, details, userInvolved } = req.body;
    let reportDetails = new UserReport({
      reportId,
      userId,
      details,
      userInvolved,
    });
    const createdReport = await reportDetails.save();
    res.status(201).json(createdReport);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Deletes all user reports
// @route   DELETE /api/user-reports
// @access  Public

const delUserReports = async (req, res) => {
  try {
    await UserReport.deleteMany({});
    res.json({ message: "All the warns have been deleted!" });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Gets all user reports
// @route   GET /api/user-reports/:userid
// @access  Public

const getAllUserReportsById = async (req, res) => {
  try {
    const userId = req.params.userid;
    const reports = await UserReport.find({ userId });
    res.json(reports);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Deleting user reports of a user
// @route   DELETE /api/user-reports/:userid
// @access  Public

const deleteUserReportByUserId = async (req, res) => {
  try {
    const userId = req.params.userid;
    await UserReport.deleteMany({ userId });
    res.json({ message: `Deleted all the warns of ${userId}` });
  } catch (error) {
    console.error(error);
  }
};

// @desc    Gettin a report
// @route   GET /api/user-reports/report/:reportid
// @access  Public

const getReportByReportId = async (req, res) => {
  try {
    const reportId = req.params.reportid;
    const report = await UserReport.findOne({ reportId });
    if (!report) {
      res.json({
        reportExist: false,
        message: "No report with that report ID was found!",
      });
      return;
    }
    res.json(report);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addUserReport,
  getAllUserReports,
  delUserReports,
  getAllUserReportsById,
  deleteUserReportByUserId,
  getReportByReportId,
};
