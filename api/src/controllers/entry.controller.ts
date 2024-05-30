import * as express from "express"
import { isEmpty } from "validator";
import entryModel from "../../models/entry.model";

export const getEntries = (req: express.Request, res: express.Response) => {

}

export const getEntry = (req: express.Request, res: express.Response) => {

}

export const postEntry = (req: express.Request, res: express.Response) => {
    try {
        
        const {date, type, amount} = req.body;

        if (isEmpty(date) || isEmpty(type) || isEmpty(amount) )
            throw Error("post_entry_empty_field");

        entryModel.create({
            userId: res.locals.user._id,
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

}

export const deleteEntries = (req: express.Request, res: express.Response) => {

}