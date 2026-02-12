import express from "express";
import Company from "../models/Company.js";
import Lead from "../models/Lead.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, async (_, res) => {
    res.json(await Company.find());
});

router.get("/:id", protect, async (req, res) => {
    const company = await Company.findById(req.params.id);

    const leads = await Lead.find({
        company: req.params.id,
        deletedAt: null
      }).populate("assignedTo", "name");
      

    res.json({ company, leads });
});



router.post("/", protect, async (req, res) => {
    res.json(await Company.create(req.body));
});

export default router;
