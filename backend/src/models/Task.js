import mongoose from "mongoose";

export default mongoose.model(
  "Task",
  new mongoose.Schema({
    title: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: Date,
    status: { type: String, default: "Pending" }
  })
);
