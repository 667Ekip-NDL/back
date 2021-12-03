const cors = require("cors");

require("dotenv").config();
// set port, listen for requests
var express = require("express"), app = express(); 

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to 667Ekip application." });
});
  
//require("./src/routes/tutorial.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    }
);

const mongoose = require('mongoose')
mongoose
  .connect('mongodb://loulou:ndl2021xo@mongo:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


const personneModel = require("./src/models/personne.model");
const sauvetageModel = require("./src/models/sauvetage.model");

app.post("/personne", function (req, res) {
    const data = { nom: req.body.nom, prenom: req.body.prenom, title: req.body.title}
    const personne = new personneModel(data);
    personne.save().then( (personne) => 
        console.log(personne),
        res.json(personne));
        // (data) => res.json(data));
})

// const tuto = new tutoModel({title: "test", description: "test", published: true});
// tuto.save()
