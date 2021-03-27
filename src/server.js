const { response } = require('./app');
const app = require('./app');
const { PORT } = require('./config');
const Utils = require('./utils');
const fetch = require('node-fetch')



app.post('/weather', async (req, res) => {
  const { city, state } = req.body;
  let weatherData;
  if(!city) {
    res.json({error: "You must choose a city."})
  } else if(!state) {
    res.json({error: "You must choose a state."})
  } else {
    // let url = encodeURI(`api.openweathermap.org/data/2.5/weather?q=${city},${state},us&appid=187c350bc499319e901a3878bf509cae`);
    let url = `api.openweathermap.org/data/2.5/weather?q=boston,ma,us&appid=187c350bc499319e901a3878bf509cae`
    console.log(url)
    fetch(url)
    // .then(res => res.json())
    .then(res => console.log(res))
    
    // const weatherData = await Utils.makeFetch(url)

    // weatherData = await fetch(url, {
    //   method: 'GET',
    //   mode: 'cors',
    //   credentials: '*',
    //   headers: {
    //       'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify()
    // })
    // .then(res => res.json())

    // console.log(weatherData)
    res.send('ho')
  }
})

app.get('/', (req, res) => {
  res.send('Hello, world!')
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})