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

// let personnes = require('./json/personnes.json');
// for (var i = 0; i < personnes.length; i++) {
//     json=personnes[i]
//     const data = new personneModel(json);
//     data.save().then((x) => console.log(x));
// }

// //sauvetages
// let sauvetages = require('./json/sauvetages.json');
// for (var i = 0; i < sauvetages.length; i++) {
//     json=sauvetages[i]
//     const data = new sauvetageModel(json);
//     data.save().then((x) => console.log(x));
// }

app.post("/personne", function (req, res) {
    const data = { nom: req.body.nom, prenom: req.body.prenom, title: req.body.title}
    const personne = new personneModel(data);
    personne.save().then( (personne) => 
        console.log(personne),
        res.json(personne));
        // (data) => res.json(data));
})

app.post("/sauvetage", function (req, res) {
    const data = { title: req.body.title, date: req.body.date, participants: req.body.participants, saved: req.body.saved}
    const sauvetage = new sauvetageModel(data);
    sauvetage.save().then( (sauvetage) => 
        console.log(sauvetage),
        res.json(sauvetage));
        // (data) => res.json(data));
})

// app.get("/find", function (req, res) {
//     const data = req.query.search
//     var array = [];

//     const sauvetageJson = sauvetageModel.aggregate([
//     { 
//         $addFields: {
//             results: { $regexMatch: { input: "$title", regex: data }},
//             type: "sauvetage"
//         }
//     },

//     { $match: { results: true }}
//     ])
//     .exec()

//     const personneJson = personneModel.aggregate([
//         { 
//             $addFields: {
//                 results: { $regexMatch: { input: "$nom", regex: data }},
//                 type: "sauvetage"
//             }
//         },
    
//         { $match: { results: true }}
//         ])
//         .exec()


//     var array = sauvetageJson.then((sauvetageJson) => {
//         return Array(sauvetageJson)
//     })
//     var array2 = personneJson.then((personneJson) => {
//         return Array(personneJson)
//     });
//     var finalArray = [array,array2]
//     res.json({
//         data: finalArray,
//     })
// })

app.get("/findsauvetage", function (req, res) {
    const data = req.query.search
    var array = [];

    const json = sauvetageModel.aggregate([
    { 
        $addFields: {
            results: { $regexMatch: { input: "$title", regex: data }},
            type: "sauvetage"
        }
    },

    { $match: { results: true }}
    ])
    .exec()
    json.then((json) => {res.json({
            data: json,
        })
    });
})

app.get("/findpersonne", function (req, res) {
    const data = req.query.search
    var array = [];

    const json = personneModel.aggregate([
    { 
        $addFields: {
            results: { $regexMatch: { input: "$nom", regex: data.toUpperCase() }},
            type: "personne"
        }
    },

    { $match: { results: true }}
    ])
    .exec()
    json.then((json) => {res.json({
            data: json,
        })
    });
})

if(process.env.ENVI === 'development'){
        app.get("/test", function (req, res) {
        res.json({
            data: [
                    {"type":"sauvetage",
                    "data":{
                    "title":"tom",
                    "date":"5",
                    "participants":[],
                    "capitaine":"bob l'eponge",
                    "saved":"XXXX",
                    }
                },
                    {"type":"personne",
                    "data":{
                    "nom":"XXX",
                    "prenom":"XXX",
                    "title":"XXXX",
                    }
                },
            ]
            
        })
    })
}




// const tuto = new tutoModel({title: "test", description: "test", published: true});
// tuto.save()

