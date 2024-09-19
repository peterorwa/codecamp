// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", function (req, res) {
  
  //thisDate = dateConverter(req.params.date);
  if (req.params.date && req.params.date != '') {
    res.json(dateConverter(req.params.date));
  } 
  
});

app.get("/api/", function (req, res) {
  res.json(dateConverter(Date.now()));
});



function dateConverter(maybeDate){
  let newDate, unixValue, utcValue;
  newDate = new Date(maybeDate);

  if(isNaN((newDate))){
    newDate = new Date(parseInt(maybeDate));
  }
  
  if (isNaN(newDate)){
    return {
      error: "Invalid Date"
    };
  } else {
    if(isNaN(maybeDate)) {
      unixValue = newDate.getTime();
    
    } else {
      unixValue = maybeDate;
    }
    utcValue = newDate.toUTCString();
    return {
      unix: parseInt(unixValue),
      utc: utcValue,
    };
  }
}






// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
