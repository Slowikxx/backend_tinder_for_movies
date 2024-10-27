const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT_NUMBER = 8080;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.send('Backend is running');
});

app.get('/recommendations', (req, res) => {
	fs.readFile(__dirname + '/' + 'recommendations.json', 'utf8', (err, data) => {
		if (err) {
			return res
				.status(500)
				.send('Error retrieving data from recommendations file');
		}

		res.status(200).send(data);
	});
});

app.listen(PORT_NUMBER, () => {
	console.log(`Srver is running on port ${PORT_NUMBER}`);
});
