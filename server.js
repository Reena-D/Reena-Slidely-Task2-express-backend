const express = require('express');
const bodyParser = require('body-parser');
//const data = require('db.json');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.post('/data', (req, res) => {
//     const dbData = req.body;
//     fs.writeFile('db.json', JSON.stringify(dbData, null, 2), (err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error writing to database file');
//             return;
//         }

//         res.send('Data received and stored');
//     });

// });

const newData = req.body;

// Read the current data from db.json
fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send('Error reading database file');
        return;
    }

    let dbData = JSON.parse(data);
    // Add the new data to the existing data
    dbData.push(newData);

    // Write the updated data back to db.json
    fs.writeFile('db.json', JSON.stringify(dbData, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to database file');
            return;
        }

        res.send('Data received and stored');
    });

    
});

});

app.get('/data', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading database file');
            return;
        }

        res.send(data);
    });
});


app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
});
