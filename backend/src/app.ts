// src/app.ts
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import https from "https";
import { readFileSync } from "fs";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, PREFIX } from "@config";
import DB from "@models/index";
import { Routes } from "@interfaces/routes.interface";
import errorMiddleware from "@/middleware/error.middleware";
import { logger, stream } from "@utils/logger";
import path from "path";

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    if (this.env === "development") {
      // this.initializeQueueWorkers();
    }
    this.initializeErrorHandling();
  }

  public listen() {
    logger.info(process.env.NODE_ENV);

    let server: http.Server | https.Server;

    if (process.env.NODE_ENV === "production") {
      try {
        const options = {
          key: readFileSync(__dirname + "/certs/privkey.pem"),
          cert: readFileSync(__dirname + "/certs/cert.pem"),
        };
        server = https.createServer(options, this.app);
      } catch (e) {
        logger.error("Failed to load SSL certificates", e);
        return;
      }
    } else {
      server = http.createServer(this.app);
    }
    console.log("Port:", __dirname);
    // Start the server
    server.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => logger.info("Database authenticated successfully"))
      .catch((err: Error) => logger.error(err.message));
  }

  private initializeMiddlewares() {
    const logFormat = LOG_FORMAT || "combined"; // Default to 'combined' if undefined
    this.app.use(morgan(logFormat, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    // Serve static files from the "images" directory
    this.app.use("/api/images", express.static(path.join(__dirname, "public/images")));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      console.log("Initializing route:", PREFIX, route.path);
      this.app.use("/" + PREFIX + "/", route.router);
    });
  }

  // private initializeQueueWorkers() {
  //   const queueNames: string[] = ["htmlToPdfLayeredQueue", "htmlToPdfFlattenQueue"];
  //   new QueueWorker(queueNames);
  // }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
