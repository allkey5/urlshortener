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

    async deleteUrl(shortId: string){
        try {
            const deleted = await Url.deleteOne({shortId: shortId});
            if(deleted.deletedCount != 1){
                throw new Error("Not found Url")
            } 
        } catch (e) {
            throw new Error("Error when deleting Url: " + e);
        }
    }
}
export default new UrlService();