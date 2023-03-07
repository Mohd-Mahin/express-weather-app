const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewDirectoryPath = path.join(__dirname, '..', 'template');
const partialsPath = path.join(__dirname, '..', 'template', 'partials');

app.use(express.static(publicDirectoryPath));


app.set('view engine', 'hbs');
app.set('views', viewDirectoryPath);

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main Page',
        appName: 'Weather',
        name: 'Mohd Mahin Ansari'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mohd Mahin Ansari'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Mohd Mahin Ansari'
    });
})

app.get('/weather', (req, res) => {
    res.send({
        title: 'Weather',
        forecast: '29 deg celcius',
        location: 'allahabad',
        name: 'Mohd Mahin Ansari'
    })
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404',
        errorMessage: 'Help Article not found',
        name: 'Mohd Mahin Ansari'
    })
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        errorMessage: 'Page not found...',
        name: 'Mohd Mahin Ansari'
    });
});


app.listen(3000, () => console.log('listening on port 3000'));