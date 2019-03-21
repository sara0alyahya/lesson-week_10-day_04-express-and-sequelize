import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/****** Middleware  ****/
app.use(bodyParser.json());

/**** Routes ***/

// Root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello WDI-Infinity!"
    });
})

// localhost:3000
// localhost:3000/

// get all people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peoplefromDB => {
            res.status(200).json({
                people: peoplefromDB
            });
        })
        .catch(e => console.log(e));
})


// http://localhost:3000/api/person/2

// get Person by record ID
app.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({
                        person: person
                    });
                }
                else {
                    res.status(404).json({ error: 'Person Not Found' });
                }

            })
            .catch(e => console.log(e));
    }
    else {
        res.status(406).json({ error: 'Invalid ID' });
    }

});


// POST  http://localhost:3000/api/person

// create new person
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });
        })
        .catch(e => console.log(e));
})


// Delete single person by ID

app.delete('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.destroy({
            where: { id: req.params.id }
        })
            .then(person => {
                res.status(202).json({ person: req.params.id });
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});

// update current person by ID 

app.patch('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.update({ first_name: "SARA", last_name: "ALYAHYA" }, { where: { id: req.params.id } }
        )
            .then(person => {

                res.status(202).json({ person: person });
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});
app.listen(port, () => console.log(`express-api app listening on port ${port}!`));