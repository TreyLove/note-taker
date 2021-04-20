// requires for basic functionality 
const express = require('express');
const path = require('path');
const fs = require("fs");
const { json } = require('express');
//boilerplate 
const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// routing for navigating from the home page to the notes page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})
// 
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }

        const userInput = JSON.parse(data)

        return res.json(userInput)

    })

})
// routing related to saving and displaying user notes
app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }

        const userInput = JSON.parse(data)
        //creates a unique id for each note
        req.body.id = Math.floor(Math.random() * 1000000)

        userInput.push(req.body)
        console.log(JSON.stringify(userInput))
        // logs new notes made by the user and saves them to the db.json file
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(userInput), (error) => {
            if (error) {
                console.log(error)
            }
        })
        return res.json(userInput)
    })
})
// rounting and functionality for deleting notes made by the user
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf-8", (error, data) => {
        if (error) {
            console.log(error)
        }
        const currentNotes = JSON.parse(data)
        console.log("_______________")
        //console.log(currentNotes)
        //console.log(req.params.id)
        console.log(typeof req.params.id)


        // loop to determine which note needs to be deleted based off of id
        currentNotes.forEach((e, i) => {
            console.log(e.id + req.params.id)
            if (e.id == req.params.id) {

                currentNotes.splice(i, 1)
                console.log(currentNotes)
            }

        });

        //overwrites file with the chosen note removed
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(currentNotes), (error) => {
            if (error) {
                console.log(error)
            }
            console.log("entry deleted")
        })

        res.json(currentNotes)
    })
})




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



