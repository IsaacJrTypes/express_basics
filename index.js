import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Create random num generator btw 0 and 1
function numGenerator() {
    const range = 2;
    const num = Math.floor(Math.random() * range); // Will only output 0 or 1
    console.log(num);
    return num;
};

app.set('port', port);

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Hello Mundo');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About Page');
});


app.get('/foo', (req, res, next) => {
    const num = numGenerator();
    if (num === 0) {
        res.type('text/plain');
        res.send('sometimes this');
    } else {
        next();
    }
});

app.get('/foo', (req, res) => {
    res.type('text/plain');
    res.send('and sometimes that');
});

app.get('/user', (req, res) => {
    console.log(req.query);
    res.type('text/plain');
    res.send(`query: ${JSON.stringify(req.query)}`);
})

const userRegex = /^\/user(?:\(name\)|name)?$/i; // Regex so user, username, user(name) go to same path

app.get(userRegex, (req,res) => {
    const path = req.path
    res.type('text/plain')
    res.send(`used ${path} to get to user page `)
   
})

app.get('/user/:name', (req,res) => {
    const param = req.params // Grabs name from url, express saves to object
   // console.log(param)
    res.type('text/plain');
    res.send(`Hello ${param.name}`);
})

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404: Not Found');
});

app.listen(app.get('port'), () => {
    console.log(`Express running at ${port}`);
    console.log(`In browser go to: http://localhost:${port}`);
});
