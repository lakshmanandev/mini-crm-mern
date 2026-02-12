// import express from "express";
// import Lead from "../models/Lead.js";
// import Task from "../models/Task.js";
// import { protect } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", protect, async (_, res) => {
//   const totalLeads = await Lead.countDocuments({ deletedAt: null });
//   const qualified = await Lead.countDocuments({ status: "Qualified" });
//   const tasksDone = await Task.countDocuments({ status: "Completed" });

//   res.json({ totalLeads, qualified, tasksDone });
// });

// export default router;



import express from "express";
import Lead from "../models/Lead.js";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const totalLeads = await Lead.countDocuments({ deletedAt: null });
  const qualifiedLeads = await Lead.countDocuments({
    status: "Qualified",
    deletedAt: null
  });

  const tasksDueToday = await Task.countDocuments({
    assignedTo: req.user._id,
    dueDate: { $lte: new Date() },
    status: "Pending"
  });

  const completedTasks = await Task.countDocuments({
    assignedTo: req.user._id,
    status: "Completed"
  });

  res.json({
    totalLeads,
    qualifiedLeads,
    tasksDueToday,
    completedTasks
  });
});

export default router;
