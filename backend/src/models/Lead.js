import mongoose from "mongoose";

export default mongoose.model(
  "Lead",
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    status: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedAt: { type: Date, default: null }
  })
);
