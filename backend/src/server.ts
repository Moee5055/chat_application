import express from "express";

const app = express();
console.log("hello");
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
