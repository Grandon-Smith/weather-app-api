const { response } = require('./app');
const app = require('./app');
const { PORT } = require('./config');
const Utils = require('./utils');
const fetch = require('node-fetch')

app.post('/test', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { city, state, units } = req.body;
  if(!city) {
    res.json({error: "You must choose a city."})
  } else if(!state) {
    res.json({error: "You must choose a state."})
  } else if(!units) {
    res.json({error: "You must choose a unit type."})
  } else {
    res.send('test success')
  }
})

app.post('/weather', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { city, state, units } = req.body;
  if(!city) {
    res.json({error: "You must choose a city."})
  } else if(!state) {
    res.json({error: "You must choose a state."})
  } else if(!units) {
    res.json({error: "You must choose a unit type."})
  } else {
    let url = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&units=${units}&appid=${process.env.WEATHER_APP_API_KEY}`);

    let firstWeatherData = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify()
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        return res.json({error: "There was an problem fetching your weather data"})
      }
    })
    const { lon, lat } = firstWeatherData.coord;
    const weatherUrl = encodeURI(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${units}&appid=187c350bc499319e901a3878bf509cae`);
    const moreWeatherData = await fetch(weatherUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify()
    })
    .then(res => {
      if(res.ok){
        return res.json()
      } else {
        return res.json({error: "There was an problem fetching your weather data"})
      }
    })
    .catch()
    if(moreWeatherData.cod == 404) {
      res.status(404).json({error: "That city isn't in our database. Please make sure the location is spelled correctly."})
    } else {
    res.status(200).json({firstWeatherData, moreWeatherData})
    }
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!')
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})