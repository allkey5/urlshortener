import IUrl from "../interfaces/IUrl";
import Url from "../models/Url";

class UrlService {
    async generateUrl(Urldata: IUrl) {
        const url = await Url.create(Urldata);
        return url;
    }
    async getUrl(shortId: string){
        const url = await Url.findOne({shortId: shortId});
        return url;
    }
}
export default new UrlService();