const { response } = require('./app');
const app = require('./app');
const { PORT } = require('./config');
const Utils = require('./utils');
const fetch = require('node-fetch')


app.post('/weather', async (req, res) => {
  const { city, state, units } = req.body;
  let weatherData;
  if(!city) {
    res.json({error: "You must choose a city."})
  } else if(!state) {
    res.json({error: "You must choose a state."})
  } else if(!units) {
    res.json({error: "You must choose a unit type."})
  } else {
    let url = encodeURI(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},us&units=${units}&appid=${process.env.WEATHER_APP_API_KEY}`);

    // const weatherData = await Utils.makeFetch(url)

    weatherData = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: '*',
      headers: {
          'Content-Type': 'application/json',
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

    res.send(weatherData)
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!')
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})