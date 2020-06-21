import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getAllPlayers,
  getSinglePlayer,
  addPlayer,
  deletePlayer,
  updatePlayer,
} from "./api/index.ts";
const router = new Router();
router
  .get("/healsCheck", ({ response }: { response: any }) => {
    response.body = "It's good there";
  })
  .get("/api/v1/players", getAllPlayers)
  .get("/api/v1/player/:id", getSinglePlayer)
  .get("/api/v1/players", addPlayer)
  .get("/api/v1/players/:id", updatePlayer)
  .get("/api/v1/player/:id", deletePlayer);
