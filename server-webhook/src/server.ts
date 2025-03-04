import { App } from "./main/app";
import { MongoHelper } from "./shared/infra/db/mongo-client";

MongoHelper.connect('mongodb://localhost:27017/webhook-commerce')
  .then(async () => {
    console.warn('Connected to MongoDB');
    const app = new App();
    app.initServer(3001);
  })
  .catch(console.error);
