const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res){
  console.log(req.body.cityName);
  var query = req.body.cityName
const apiKey = "add the api token"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey

https.get(url, function(response){
  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const wetherDescription = weatherData.weather[0].description
    const icon = "<img src=http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png>"
    var temParis = "The tempature in " + query + " is " + temp + " degrees in Celcius."
    var wetherDescription1 = "The weather is currently " + wetherDescription
    res.write("<h1>"+temParis+"</h1>" + wetherDescription1)
    res.write(icon)
    res.send()
  })
})
})


app.listen(3000, function(){

})
