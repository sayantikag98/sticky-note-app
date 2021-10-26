import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Note = mongoose.model("note", noteSchema);

export default Note;