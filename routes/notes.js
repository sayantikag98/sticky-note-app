import express from "express";
import Note from "../models/notes.js";

const router = express.Router();

router.get("/", (req, res) => {
    Note.find()
    .then(result => {
        res.render("notes",{
            title: "Notes Page",
            notes: result
        });
    })
    .catch(error => {
        console.log(error.message);
    });    
});

router.get("/create", (req, res) => {
    res.render("create-note", {
        title: "Create note page"
    });
});

router.get("/edit/:id", (req, res) => {
    Note.findById(req.params.id)
    .then(result => {
        res.render("edit-note", {
            title: "Edit note page",
            note: result,
            id: req.params.id
        });
    })
    .catch(error => {
        res.send(`No such note with id ${req.params.id} exists in the database.`)
    });
});

router.post("/", (req, res) => {
    const note = new Note(req.body);
    note.save()
    .then(result => {
        res.redirect("/notes");
    })
    .catch(error => {
        console.log(error.message);
    });
})

router.get("/:id", (req, res) => {
    Note.findById(req.params.id)
    .then(result => {
        if(!result) res.send(`No note in the database.`)
        else{
            res.render("display-note", {
                title: "Note display page",
                note: result,
                id: req.params.id
            });
        }   
    })
    .catch(error => {
        res.send(`No such note with id ${req.params.id} exists in the database.`);
    });
});

router.post("/:id", (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
        res.redirect(`/notes/${req.params.id}`);
    })
    .catch(error => {
        res.send(`No such note with id ${req.params.id} exists in the database.`);
    });
});

export default router;