import mongoose from "mongoose";

const QRschema = new mongoose.Schema({
    CompanyName: {type:String, required:true},
    WorkingDays: {type:String, required:true}
});

export default mongoose.model("QR", QRschema);