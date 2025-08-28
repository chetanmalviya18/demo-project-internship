import { Router } from "express";
import handleUpdateProfile from "../controllers/profile.controller.js";

const router = Router();

////Route to update a Profile by ID
// PUT /api/profile/:id
router.put("/profile/:profileId", handleUpdateProfile);

export default router;
