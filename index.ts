// app.ts
import express from "express";
import orderRoutes from "./src/routes/order.routes";

const app = express();
app.use(express.json());

app.use("/api", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
