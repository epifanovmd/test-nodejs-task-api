import Koa from "koa";
import KoaRouter from "koa-router";
import { errorHandler } from "./common/handlers/errorHandler";
import { notFoundHandler } from "./common/handlers/notFoundHandler";
import { appMiddlewares } from "./middleware/appMiddlewares";
import { RegisterSwagger } from "./middleware/swagger";
import { RegisterRoutes } from "./routes";

const PORT = 5000;
const app = new Koa();

// middleware
appMiddlewares(app);

// Services routes
const router = new KoaRouter();
RegisterSwagger(router, "/api-docs");
RegisterRoutes(router);

app
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(notFoundHandler);

export const server = app.listen(PORT, "localhost", () => {
  console.info(`REST API Server running on : http://localhost:${PORT}`);
});
