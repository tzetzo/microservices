import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler, NotFoundError, currentUser } from "@tmtickets/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true); // letting express know that our app is behind NGINX Proxy; by default express doesnt trust Proxies

app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption of the cookie - the JWT that will be stored in the cookie is already encrypted!
    secure: process.env.NODE_ENV !== "test", // for environments different from "test" cookies will be used only when https is used(SSL certificate used)
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// Not found path - includes GET/POST etc.
app.all("*", async () => {
  //works thanks to the "express-async-errors" library
  throw new NotFoundError();
});

//middleware
app.use(errorHandler);

export { app }; // curly braces required!
