import express from "express";
import UrlController from "../controllers/UrlController";

const router = express.Router();

router.post('/', UrlController.generateUrl)
router.get('/:url', UrlController.getUrl)

export default router;