const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oi1hw9h.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
const fs = require('node:fs')
const path = require('node:path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const PlacesRoutes = require('./routes/places-routes.js')

const usersRoutes = require('./routes/users-routes.js');
const HttpError = require('./models/http-error.js');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next();
})
  
app.use('/api/places', PlacesRoutes);

app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404)
  throw error
});


app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, (err) => {
      console.log(err)
    });
  }
  if(res.headerSent){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
})


mongoose.connect(url).then(() => {
  app.listen(5000);
}).catch((error) => {
  console.log('An error occurred')
})

//mongodb+srv://Mateus:<password>@cluster0.oi1hw9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0