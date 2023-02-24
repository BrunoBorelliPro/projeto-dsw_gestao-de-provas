import express from "express";

import { Server } from "./http/server";
import { authRouter } from "./http/routes";

const server = new Server(express(), [authRouter]);
server.start("3000");
