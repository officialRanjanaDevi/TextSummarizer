import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.configDotenv({
  path: ".env",
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is running at ", port);
});
