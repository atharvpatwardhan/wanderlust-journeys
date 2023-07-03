import express from "express";
const router = express.Router();

import { signin, signup ,updateUser} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/:id",updateUser);

export default router;