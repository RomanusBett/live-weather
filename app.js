const express = require("express");
var https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res){
const query = req.body.cityName;
const apiKey = "636c8309db9fa78ff59b9400f1abf520";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + unit;
https.get(url, function(response) {
  console.log(response.statusCode);
  response.on('data', function(data) {
    console.log(data);
    const weatherData = JSON.parse(data);
    console.log(weatherData);
    const temp = weatherData.main.temp
    console.log(temp);
    const weatherDescription = weatherData.weather[0].description
    console.log(weatherDescription);
    const icon = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write("<h1>the temperature in "+ query + " is " + temp +" Degrees Celcius.</h1>")
    res.write("<p>"+query+" is experiencing a " + weatherDescription + "<p>")
    res.write("<img src = " + imageURL + " >")
    res.send()
  })
})
})
app.listen(15000, function() {
  console.log("the server is running on port 15000");
})
