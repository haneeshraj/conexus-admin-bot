const mongoose = require("mongoose");

const warnSchema = mongoose.Schema(
  {
    warnId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Warn = mongoose.model("warn", warnSchema);

module.exports = Warn;
