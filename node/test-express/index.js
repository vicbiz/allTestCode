const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json()); // read json data --> req.body.name as json

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];

/* 
app.get();
app.post();
app.put();
app.delete();
 */

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found.");
    else res.send(course);
    
    // console.log("url params : ", req.query);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses);
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})