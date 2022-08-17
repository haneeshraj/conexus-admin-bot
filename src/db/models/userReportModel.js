const mongoose = require("mongoose");

const userReportSchema = mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    userInvolved: {
      type: String,
      default: "None",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserReport = mongoose.model("userReport", userReportSchema);

module.exports = UserReport;
