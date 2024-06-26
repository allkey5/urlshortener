import express from "express";
import UrlController from "../controllers/UrlController";
import { check } from "express-validator";

const router = express.Router();

router.post('/', [check('url', "Url filed is required").notEmpty()], UrlController.generateUrl)
router.get('/:url', [check('url', "Url filed is required").notEmpty()], UrlController.getUrl)

export default router;