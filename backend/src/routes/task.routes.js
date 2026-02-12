import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  res.json(await Task.find().populate("lead"));
});

// router.get("/", protect, async (req, res) => {
//   const tasks = await Task.find({
//     assignedTo: req.user._id
//   })
//     .populate("lead", "name")
//     .populate("assignedTo", "name");


//     console.log("Tasks for user:", req.user.name, tasks);

//   res.json(tasks);
// });


router.post("/", protect, async (req, res) => {
  res.json(await Task.create(req.body));
});

// router.put("/:id/status", protect, async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (task.assignedTo.toString() !== req.user.id)
//     return res.status(403).json({ message: "Forbidden" });

//   task.status = req.body.status;
//   await task.save();
//   res.json(task);
// });

router.put("/:id/status", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  task.status = req.body.status;
  await task.save();

  res.json(task);
});


export default router;
