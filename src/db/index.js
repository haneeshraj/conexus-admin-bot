const mongoose = require("mongoose");
const express = require("express");
const warnRoutes = require("./routes/warnRoutes.js");
const userReportRoutes = require("./routes/userReportRoutes.js");
require("colors");

const connectDB = require("./utils/db.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/warns", warnRoutes);
app.use("/api/user-reports/", userReportRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is connected to port 3000".green.bold);
});
