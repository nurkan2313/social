require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./server/routes/index.route');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(4444, () => {
    console.log(`App running on port 4444`)
})


