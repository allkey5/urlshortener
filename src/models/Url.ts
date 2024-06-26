import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
    },
    redirectUrl: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [{ timestamp: { type: Number } }]
}, { timestamps: true })

const Url = mongoose.model("url", urlSchema);

export default Url;