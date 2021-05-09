const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

//now changing views directory name to templates, and amking paths to work as earlier
// now for we made two files in templates views and partial , so again that three files we save in views directory
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)


//for dynamic assets
//handlebar

app.set('view engine','hbs')
hbs.registerPartials(partialPath)

// const aboutDirectoryPath = path.join('__dirname','../public')
// const helpDirectoryPath = path.join('__dirname','../public')

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'college',
        name : 'Ayush',
        Weather : 'weather'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'Hey Spiderman :)',
        name : 'Ayush'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Hey Spidy(^_^) help me',
        name : 'Ayush'
    })
})

// app.get('/help', (req,res) => {
//     res.send('Help page!')
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>This is my first web page!</h1>')
// })
const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

app.get('/weather', (req,res) => {
    // res.send({forecast : 'raining', location : 'Kulesara'})
    if (!req.query.address) {
        return res.send({
            errror : 'please enter address'
        })
    }
    // const address = req.query.address
     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ req.query.address + '.json?access_token=pk.eyJ1IjoiYXl1c2gxNDEiLCJhIjoiY2tvN2U1Zzg5MXY0MjJ3bHBvNDBsam14dyJ9.nE6IFbABUgUVcj_uIhh_IQ'

    geocode(req.query.address,(error, {latitude,longitude,Location} = {}) => { 
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }   
            res.send({
                longitude,
                latitude,
                Weather_description : forecastData,
                Address : Location
            })
        })
    
})
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
        console.log(req.query.search)
        res.send({
            products: []
        })
    
})
//web.com
//web.com/help
//web.com/about

app.get('/help/*', (req, res) => {
    res.render('helperror',{
        title : ' help page not found'
    })
})

app.get('*',(req,res) => {
    res.render('helperror',{
        title : ' 404 error'
    })
})

app.listen(9000, () => {
    console.log('Server is up on port 9000')
})

// var app = require('express')();

// var listener = app.listen(8888, function(){
//     console.log('Listening on port ' + listener.address().port); //Listening on port 8888
// })