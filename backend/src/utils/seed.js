import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count > 0) return;

  const password = await bcrypt.hash("password123", 10);

  await User.insertMany([
    { name: "Admin", email: "admin@test.com", password },
    { name: "John", email: "john@test.com", password }
  ]);

  console.log("Users seeded");
};

export default seedUsers;
