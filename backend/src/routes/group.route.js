import express from "express";
import {
  getMessages,
  joinGroup,
  createNewGroup,
  getAllGroups,
  removeMembersFromGroup,
  sendMessageToGroup,
} from "../controllers/group.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", protectRoute, createNewGroup);
router.get("/join/:groupId", protectRoute, joinGroup);
router.get("/get-message/:groupId", protectRoute, getMessages);
router.get("/get-all-groups", protectRoute, getAllGroups);
router.get("/remove/:groupId", protectRoute, removeMembersFromGroup);
router.post("/add-message/:groupId", protectRoute, sendMessageToGroup);

export default router;
