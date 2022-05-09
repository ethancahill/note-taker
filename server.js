const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/routes.js");

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); 

// instructs the server to make certain files readily available and to not gate it behind a server endpoint.
app.use(express.static('public'));

app.use('/', routes);
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});