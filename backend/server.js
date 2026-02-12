import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import seedUsers from "./src/utils/seed.js";

// connectDB();
connectDB().then(seedUsers);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Mini CRM API is running 🚀"
  });
});


app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
