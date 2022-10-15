import express from "express";

import authenticatedRoutes from "./authenticated.routes";
import publicRoutes from "./public.routes";

export default (app) => {
  publicRoutes(app);
  authenticatedRoutes(app);
};
