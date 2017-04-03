const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
var now = new Date().toString();
var log = `${now} : ${req.method} ${req.url}`;

console.log(log);
//console.log(`${now} : ${req.method} ${req.url}`);
fs.appendFile('server.log', log + '\n');
next();
});

/* Uncomment only in case if the site is under maintenance
app.use((req,res,next) => {
  res.render('maintenance.hbs')
});
*/

app.use(express.static(__dirname + '/public')); //copied here so that if site is in maintenance mode, then all pages including help.html
//state that info only

hbs.registerHelper('getCurrentYear' , () => {
  //return 'test'; //use this to check if the helper method is called in the page or not
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name : 'Rupal',
    likes : [
      'Singing',
      'Dogs',
      'Travelling'
    ]
  }); */

  res.render('home.hbs', {
    pageTitle : 'Home Page',
    welcomeMessage : 'Hi There! Welcome to our home page'
    //currentYear : new Date().getFullYear() //Js function to get current full year
  })
});

app.get('/about',(req,res) => {
  //res.send('About Page');
  res.render('about.hbs',{
    pageTitle : 'About Page'
    //currentYear : new Date().getFullYear() //Js function to get current full year
  });
})

app.get('/projects',(req,res) => {
  //res.send('About Page');
  res.render('projects.hbs',{
    pageTitle : 'Portfolio Page'
    //currentYear : new Date().getFullYear() //Js function to get current full year
  });
})

// create new route for /bad to simulate what happens when a request fails; respond back json data with errorMessage property
app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'Unable to fulfil request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
