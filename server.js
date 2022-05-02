const express = require('express')
const app = express()
const engine = require('express-handlebars').engine
const port = 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

var CachingProxy=require('caching-proxy')
var proxy = new CachingProxy({
    port: 9090, 
    dir: './data/cached-data'
})

app.get('/', (req, res) => {
    res.render('main',{
        id: 1
    });
})

// called via cache server
app.get('/slide/:id', (req, res) => {
    res.send('Hello World!' + req.params.id)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})