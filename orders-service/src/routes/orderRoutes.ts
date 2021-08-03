import express from "express";

import * as orderController from "../controllers/orderController";

const router = express.Router();

router.route("/").post(protect, orderController.createPost);

router
  .route("/:id")
  .patch(protect, orderController.updatePost)
  .delete(protect, orderController.deletePost);

export default router;
