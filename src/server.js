const app = require('./app')

const { PORT } = require('./config')

app.get('/', (req, res) => {
  res.send('Hello, world!')
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})