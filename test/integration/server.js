var express = require('express');
var parser = require('body-parser');
var app = express();

var PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    next();
});

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get('/users', (req, res) => {
    res.json([
        {
            name: 'Mary',
            surname: 'Jones'
        },
        {
            name: 'Jim',
            surname: 'Page'
        }
    ])
});

app.post('/users', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log('server is running at http://localhost:' + PORT);
});