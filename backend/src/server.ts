import { app } from "./app";
import { pool } from "./config/db";

const port = Number(process.env.PORT) || 5000;

pool //connection check
  .query("SELECT 1")
  .then(() => console.log("Postgres is connected."))
  .catch((err) => console.error("Connection failed:", err));

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
