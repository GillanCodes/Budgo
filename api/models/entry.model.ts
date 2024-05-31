import { Document, ObjectId, Schema, model } from "mongoose";

export interface IEntry extends Document
{
    _id: ObjectId | string,
    userId: ObjectId | string,
    name: string,
    date: Date | number | string,
    type: string | number,
    amount: number | string,
    createdAt: Date | string,
    updatedAt: Date | string,
};

const entrySchema = new Schema<IEntry>({
    userId: {type: String, required: true},
    name: {type: String, default:"Default Entry"},
    date: {type: String, required: true},
    type: {type: String, default: "expense"},
    amount: {type: Number, required:true},
});

const entryModel = model<IEntry>('entries', entrySchema);
export default entryModel;