const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const coinsRouter = require('./routes/coins');
const errorHandler = require('./middleware/errorHandler');
dotenv.config({ path: './.env' })
const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000'
    ]
}));

app.use('/api/coins', coinsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
