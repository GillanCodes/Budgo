import * as express from "express"
import entryModel from "../../models/entry.model";
import { isValidObjectId } from "mongoose";
import isEmpty from "../utils/isEmpty";

export const getEntries = async (req: express.Request, res: express.Response) => {
    if (isEmpty(res.locals.user))
        throw Error("not_logged");

    try {
        const entries = await entryModel.find({userId: res.locals.user._id}).sort({createdAt: -1});
        return res.status(200).send(entries);
    } catch (error) {
        //TODO : Error Handle
        console.log(error);
    }
}

export const getEntry = async (req: express.Request, res: express.Response) => {
    if (isEmpty(res.locals.user))
        throw Error("not_logged");

    const { id } = req.params;

    if (isEmpty(id))
        throw Error("empty_field_id");
    if (!isValidObjectId(id))
        throw Error("not_valid_id");

    try {
        const entries = await entryModel.find({_id: id,userId: res.locals.user._id}).sort({createdAt: -1});
        return res.status(200).send(entries);
    } catch (error) {
        //TODO : Error Handle
        console.log(error);
    }
}

export const postEntry = (req: express.Request, res: express.Response) => {
    try {
        
        const {name, date, type, amount} = req.body;

        if (isEmpty(date) || isEmpty(type) || isEmpty(amount) || isEmpty(name))
            throw Error("post_entry_empty_field");

        entryModel.create({
            userId: res.locals.user._id,
            name,
            date,
            type,
            amount
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            //TODO: Error Handle
            console.log(err);
        })

    } catch (error) {
        //TODO : Error Handle
        console.log("error")
    }
}

export const patchEntry = (req: express.Request, res: express.Response) => {
    if (isEmpty(res.locals.user))
        throw Error("not_logged");

    const { id } = req.params;

    if (isEmpty(id))
        throw Error("empty_field_id");
    if (!isValidObjectId(id))
        throw Error("not_valid_id");

    const {name, amount, type, date} = req.body;
    
    if (isEmpty(date) || isEmpty(type) || isEmpty(amount) || isEmpty(name))
            throw Error("post_entry_empty_field");

    try {
        
        entryModel.findByIdAndUpdate(id, {
            $set: {
                name,
                amount,
                type,
                date,
            }
        }, {upsert: true, new: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            // TODO : Error Handle
            console.log(err);
        })

    } catch (error) {
        //TODO : Error Handle
        console.log(error);
    }
}

export const deleteEntry = async (req: express.Request, res: express.Response) => {
    try {        
        const { id } = req.body;

        if(isEmpty(id))
            throw Error("empty_field_id");
        if (!isValidObjectId(id))
            throw Error("not_valid_id");
        if (isEmpty(res.locals.user))
            throw Error("not_logged");

        try {

        await entryModel.find({_id: id, userId:res.locals.user._id}).deleteOne();
        return res.status(201).send({id});
            
        } catch (error) {
            // TODO : Error Handle
            console.log(error);
        }

    } catch (error) {
        // TODO : Error Handle
        console.log(error);
    }
}