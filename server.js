const express = require('express');
const path = require('path');
const fs = require("fs");
const { json } = require('express');

const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }

        const userInput = JSON.parse(data)

        return res.json(userInput)

    })

})

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }

        const userInput = JSON.parse(data)

        req.body.id = Math.floor(Math.random() * 1000000)

        userInput.push(req.body)
        console.log(JSON.stringify(userInput))

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(userInput), (error) => {
            if (error) {
                console.log(error)
            }
        })
    })
})

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf-8", (error, data) => {
        if (error) {
            console.log(error)
        }
        const currentNotes = JSON.parse(data)
        console.log("____________________________________")
        console.log(currentNotes)

        const deleteNotes = (id) => {
            currentNotes.filter(this.id !== id)
            return currentNotes
        }

        deleteNotes(req.params.id)
    })
})




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



