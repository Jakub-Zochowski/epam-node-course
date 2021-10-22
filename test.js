const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})

app.listen(PORT, () => console.log(`The app is listening to ${PORT}`));