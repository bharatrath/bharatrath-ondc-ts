const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "prisma/schema.prisma");
const modelsDir = path.join(__dirname, "prisma/models");

// Read all .prisma files and merge their contents
const modelFiles = fs.readdirSync(modelsDir).filter((file) => file.endsWith(".prisma"));
const modelsContent = modelFiles.map((file) => fs.readFileSync(path.join(modelsDir, file), "utf8")).join("\n\n");

// Base schema (datasource + generator)
const baseSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
`;

fs.writeFileSync(schemaPath, baseSchema + modelsContent);

console.log("✅ Prisma schema merged successfully!");
