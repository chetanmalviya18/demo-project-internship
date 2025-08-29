import { Router } from "express";
import handleUpdateProfile from "../controllers/profile.controller.js";
import authenticationToken from "../middleware/authenticateToken.js";

const router = Router();

////Route to update a Profile by ID
// PUT /api/profile/:id
router.put("/profile/:profileId", authenticationToken, handleUpdateProfile);

export default router;
