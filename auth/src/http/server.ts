import express, { Express, Router } from "express";
import { connectToDatabase } from "../database/conn";

export class Server {
  private app: Express;
  private routers: Router[];

  constructor(app: Express, routers: Router[]) {
    this.app = app;
    this.routers = routers;
  }

  public async start(port: String) {
    try {
      await connectToDatabase();
    } catch (err) {
      console.error(err);
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.routers.forEach((router) => {
      this.app.use(router);
    });
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  }
}
