const express = require('express')
const app = express()
const engine = require('express-handlebars').engine

const port = 3000
const slides_url = '/slides';
const backup_url = '/default.html';
const message_url = '/message';
const sleep = 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

//TODO replace with real code (first isolate backend code)
app.get('/slide/:id', (req, res) => {
    if((0 + req.params.id) > 5) { // only respond to part of the possible slides
        res.status(404);
        return res.send()
    }
    res.send('Test hello ' + req.params.id);
})

//TODO replace with real code
app.get('/slides', (req, res) => {
    const slides = [];
    for(var i = 0; i < 10; i++){
        slides.push({url: '/slide/' + i, sleep: sleep })
    }
    res.json(slides)
})

//TODO replace with real code
app.get('/message', (req, res) => {
    res.send(`<h1>some text from server ${ new Date() } </h1>`)
})

app.get('/', (req, res) => {
    const buffers = ['slide1', 'slide2'];
    res.render('main',{
        slides_url: slides_url, // fetch list of slide + sleep info
        backup_slide: backup_url, // link to local url with general backup slide
        buffers: buffers,
        bufferArray: JSON.stringify(buffers),
        backup_wait: 5000,
        message_url: message_url
    });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})