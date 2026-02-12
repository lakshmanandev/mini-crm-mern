import express from "express";
import Lead from "../models/Lead.js";
import { protect } from "../middleware/auth.middleware.js";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
    const { page = 1, search = "", status } = req.query;
    const limit = 5;

    const query = {
        deletedAt: null,
        name: { $regex: search, $options: "i" }
    };

    if (status) query.status = status;

    const leads = await Lead.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("assignedTo", "name");

    const total = await Lead.countDocuments(query);

    res.json({
        data: leads,
        totalPages: Math.ceil(total / limit)
    });
});


// router.post("/", protect, async (req, res) => {
//     const lead = await Lead.create({
//         ...req.body,
//         deletedAt: null
//     });
//     res.json(lead);
// });

// router.post("/", protect, async (req, res) => {
//     try {
//       const data = { ...req.body };
  
//       // 🔥 REMOVE EMPTY OBJECT IDs
//       if (!data.company) delete data.company;
//       if (!data.assignedTo) delete data.assignedTo;
  
//       const lead = await Lead.create(data);
//       res.json(lead);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });

router.post("/", protect, async (req, res) => {
    try {
      const data = { ...req.body };
  
      if (!data.assignedTo) delete data.assignedTo;
      if (!data.company) delete data.company;
  
      const lead = await Lead.create(data);
  
      // 🔥 AUTO TASK CREATE
      if (lead.assignedTo) {
        await Task.create({
          title: `Follow up ${lead.name}`,
          lead: lead._id,
          assignedTo: lead.assignedTo,
          dueDate: new Date(), // today
          status: "Pending"
        });
      }
  
      res.json(lead);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

router.get("/:id", protect, async (req, res) => {
    const lead = await Lead.findOne({
        _id: req.params.id,
        deletedAt: null
    }).populate("assignedTo company");

    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
});


router.put("/:id", protect, async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(lead);
});

router.delete("/:id", protect, async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, {
        deletedAt: new Date()
    });
    res.json({ success: true });
});

export default router;
