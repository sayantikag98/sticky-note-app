import express from "express";
import {getAllNotes, addNote, createNoteForm, editNoteForm, getANote, editNoteFormSubmit, deleteNote} from "../controllers/notes.js"

const router = express.Router();



router.get("/", getAllNotes);

router.post("/", addNote);

router.get("/create", createNoteForm);

router.get("/edit/:id", editNoteForm);

router.get("/:id", getANote);

router.post("/:id", editNoteFormSubmit);

router.delete("/:id", deleteNote);


export default router;

/*
"/create" route should be placed before "/:id" otherwise it will take 
create as id which is not correct
*/