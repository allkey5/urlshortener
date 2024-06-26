import IUrl from "../interfaces/IUrl";
import Url from "../models/Url";

class UrlService {
    async generateUrl(Urldata: IUrl) {
        const url = await Url.create(Urldata);
        return url;
    }
    async getUrl(shortId: string) {
        const url = await Url.findOneAndUpdate({ shortId: shortId }, {
            $push: {
                visitHistory: { timestamp: Date.now() },
            }
        });
        if(url == null){
            throw new Error("Url not found");
        }
        return url?.redirectUrl;
    }
}
export default new UrlService();