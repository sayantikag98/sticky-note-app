import Note from "../models/notes.js";

const notFoundError = (id, res) => 
    res.render("error/404", {
        title: "Not Found Page",
        errorType: `Not Found Error`,
        msg: `No note with id ${id} exists in the database.`
    });

export const getAllNotes = (req, res) => {
    Note.find()
    .then(result => {
        res.render("notes/notes",{
            title: "Notes Page",
            notes: result
        });
    })
    .catch(error => {
        console.log(error.message);
    });    
};

export const addNote = (req, res) => {
    const note = new Note(req.body);
    note.save()
    .then(result => {
        res.redirect(`/notes/${note.id}`);
    })
    .catch(error => {
        console.log(error.message);
    });
};

export const createNoteForm = (req, res) => {
    res.render("notes/create-note", {
        title: "Create note page"
    });
};

export const editNoteForm = (req, res) => {
    Note.findById(req.params.id)
    .then(result => {
        if(!result){
            notFoundError(req.params.id, res);
        }
        else{
            res.render("notes/edit-note", {
                title: "Edit note page",
                note: result,
                id: req.params.id
            });
        }  
    })
    .catch(error => {
        notFoundError(req.params.id, res);
    });
};

export const getANote =  (req, res) => {
    Note.findById(req.params.id)
    .then(result => {
        if(!result) notFoundError(req.params.id, res);
        else{
            res.render("notes/display-note", {
                title: "Note display page",
                note: result,
                id: req.params.id
            });
        }   
    })
    .catch(error => {
        notFoundError(req.params.id, res);
    });
};

export const editNoteFormSubmit = (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
        if(!result) notFoundError(req.params.id, res);
        else res.redirect(`/notes/${req.params.id}`);
    })
    .catch(error => {
        notFoundError(req.params.id, res);
    });
};

export const deleteNote = (req, res) => {
    Note.findByIdAndDelete(req.params.id)
    .then(result => {
        if(!result) notFoundError(req.params.id, res);
        else res.json({redirect: "/notes"})
    })
    .catch(error => {
        notFoundError(req.params.id, res);
    });
};