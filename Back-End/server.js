const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user.route');
const gameRoute = require('./routes/game.route');

app.use('/api/users', userRoute);
app.use('/api/game', gameRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
