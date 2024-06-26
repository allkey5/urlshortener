import { Request, Response } from "express";
import { nanoid } from "nanoid";
import IUrl from "../interfaces/IUrl";
import UrlService from "../services/UrlService";


class UrlController {
    async generateUrl(req: Request, res: Response) {
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
            return res.json(new_url);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getUrl(req: Request, res: Response) {
        const shortUrl = req.params.url;
        if (!shortUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }
        try {
            const url = await UrlService.getUrl(shortUrl);
            if (!url) {
                return res.status(400).json({error: 'URL is required'});
            }
            res.redirect(url);
        } catch (e) {
            return res.status(500).json(e);
        }

    }

}
export default new UrlController();