const express = require("express");
const { model } = require("mongoose");
const {
  addUserReport,
  getAllUserReports,
  delUserReports,
  getAllUserReportsById,
  deleteUserReportByUserId,
  getReportByReportId,
} = require("../controllers/userReportController");
const router = express.Router();

router
  .route("/")
  .get(getAllUserReports)
  .post(addUserReport)
  .delete(delUserReports);

router
  .route("/:userid")
  .get(getAllUserReportsById)
  .delete(deleteUserReportByUserId);

router.route("/report/:reportid").get(getReportByReportId);
module.exports = router;
