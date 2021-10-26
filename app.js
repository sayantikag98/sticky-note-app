import express from "express";
import mongoose from "mongoose";
import router from "./routes/notes.js"; // putting .js extension is important over here

const app = express();
const connectionString = `mongodb+srv://Sayantikag:Sayantika98@database-practice.3cjpm.mongodb.net/sticky-note-db?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
.then(result => {
    console.log("Connection to database established");
    app.listen(3000);
})
.catch(error => {
    console.log(error.message);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use("/notes", router);


app.get("/", (req, res) => {
    res.render("index", {
        title: "Home Page"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page"
    });
});

app.use((req, res) => {
    res.render("error/404", {
        title: "404 Error Page",
        errorType: `404 Error`,
        msg: `Please recheck the url.......`
    });
});


