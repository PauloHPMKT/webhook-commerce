import { HttpRequest } from "./request";
import { HttpResponse } from "./response";

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
