const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT_NUMBER = 8080;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send('Backend is running');
});

app.listen(PORT_NUMBER, () => {
	console.log(`Srver is running on port ${PORT_NUMBER}`);
});
