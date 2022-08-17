const express = require("express");
const router = express.Router();

const {
  getWarns,
  delWarns,
  addWarn,
  getWarnsByUserId,
  deleteWarnsByUserId,
  updateWarnByWarnId,
  getWarnByWarnId,
  deleteWarnByWarnId,
} = require("../controllers/userWarns.js");

router.route("/").get(getWarns).delete(delWarns).post(addWarn);
router.route("/:userid").get(getWarnsByUserId).delete(deleteWarnsByUserId);
router
  .route("/warning/:warnid")
  .get(getWarnByWarnId)
  .patch(updateWarnByWarnId)
  .delete(deleteWarnByWarnId);
module.exports = router;
