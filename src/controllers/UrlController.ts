import { Request, Response } from "express";
import { nanoid } from "nanoid";
import IUrl from "../interfaces/IUrl";
import UrlService from "../services/UrlService";;
import { check, validationResult } from 'express-validator';
import dotnev from 'dotenv';



class UrlController {
    async generateUrl(req: Request, res: Response) {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { url: redirectUrl } = req.body;
        if (!redirectUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }
        const shortId = nanoid(8);
        const newUrlData: IUrl = {
            shortId: shortId,
            redirectUrl: redirectUrl,
            visitHistory: []
        };

        try {
            const new_url = await UrlService.generateUrl(newUrlData);
            return res.json("http:/localhost:" + process.env.PORT + "/url/" + new_url.shortId);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getUrl(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const shortUrl = req.params.url;
        if (!shortUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }
        try {
            const url = await UrlService.getUrl(shortUrl);
            res.redirect(url);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async deleteUrl(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const shortId = req.params.url;
        try {
            await UrlService.deleteUrl(shortId);
            return res.status(200).json();
        } catch (e) {
            return res.status(400).json(e);
        }
    }

}
export default new UrlController();