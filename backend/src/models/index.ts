import { Sequelize } from "sequelize";
// import initBlogModel from "./Blog";
// import initIPLogsModel from "./IPLogs";

// You'll need to import your config - adjust the path as needed
// import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DIALECT } from "@config";
// import { logger } from "@utils/logger";

// For now, using environment variables directly
const NODE_ENV = process.env.NODE_ENV || "development";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "5432";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";
const DB_DIALECT = process.env.DB_DIALECT || "postgres";

// Define the structure of DB with an index signature
interface DBStructure {
  // Blogs: ReturnType<typeof initBlogModel>;
  // IPLogs: ReturnType<typeof initIPLogsModel>;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

// Create sequelize instance
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT as any,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  pool: {
    min: 0,
    max: 50,
    idle: 30000,
    acquire: 60000,
  },
  logQueryParameters: ["development", "test"].includes(NODE_ENV),
  logging: (query: string, time?: number) => {
    // Replace with your logger if available
    console.log((time || 0) + "ms " + query);
  },
  benchmark: true,
});

// Initialize models
const DB: DBStructure = {
  // Blogs: initBlogModel(sequelize),
  // IPLogs: initIPLogsModel(sequelize),
  sequelize,
  Sequelize,
};

// Define associations between models
// Remove the existing associations and add these simplified ones
try {
  // Blog has many IPLogs
  // DB.Blogs.hasMany(DB.IPLogs, {
  //   foreignKey: "blog_uuid",
  //   sourceKey: "blog_uuid",
  //   as: "likes", // Changed alias to avoid conflict
  // });
  // // IPLog belongs to Blog
  // DB.IPLogs.belongsTo(DB.Blogs, {
  //   foreignKey: "blog_uuid",
  //   targetKey: "blog_uuid",
  //   as: "blog",
  // });
} catch (error) {
  console.error("Error setting up associations:", error);
}

// Type guard to check if a model has an associate method
function hasAssociate(model: any): model is { associate: (db: DBStructure) => void } {
  return typeof model.associate === "function";
}

// Perform associations (if your models have associate methods)
Object.keys(DB).forEach((modelName) => {
  const model = DB[modelName as keyof DBStructure];
  if (hasAssociate(model)) {
    try {
      model.associate(DB);
    } catch (error) {
      console.error(`Error associating model ${modelName}:`, error);
    }
  }
});

export default DB;
