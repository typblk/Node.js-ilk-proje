const express = require('express');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs')
const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')


const app = express();

//connect db
const dbURL = 'mongodb+srv://tayyip:typblk@cluster0.fhjso.mongodb.net/Cluster?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true,})
    .then((result) => 'Bağlantı Kuruldu')
    .catch((err) => console.log(err))

//template engine
app.set("view engine", "ejs")


//middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods:['POST', 'GET']
}))

//routes
app.get('/', photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto)
app.post('/photos', photoController.createPhoto)
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)
app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)





const port = 3000;
app.listen(port, () => {
    console.log('Sunucu başlatıldı.')
})