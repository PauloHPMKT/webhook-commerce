import express, { Application, json } from "express";
import { RoutesFactory } from "./framework/routes/routes-factory";
import { cors } from "./framework/configs/middlewares/cors";

export class App {
  public readonly app: Application;
  public readonly routes = RoutesFactory.createRoutes();

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.initRoutes();
  }

  setMiddlewares() {
    const middlewares = [
      json(),
      cors,
    ];
    this.each(middlewares);
  }

  initRoutes() {
    const routes = [
      this.routes.orderRoutes,
    ]
    this.each(routes);
  }

  private each(resource: any) {
    resource.forEach((item: any) => {
      this.app.use(item);
    });
  }

  public initServer(port: number) {
    this.app.listen(port, () => {
      console.log('Server is running on http://localhost:' + port);
    });
  }
}
