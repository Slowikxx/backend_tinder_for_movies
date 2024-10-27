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

app.put('/recommendations/:id/accept', (req, res) => {
	const recommendationId = req.params.id;

	fs.readFile(__dirname + '/' + 'recommendations.json', 'utf8', (err, data) => {
		if (err) {
			return res
				.status(500)
				.send('Error retrieving data from recommendations file');
		}

		let recommendations = JSON.parse(data);

		const currentRecommendation = recommendations.find(
			(recommendation) => recommendation.id === recommendationId
		);

		if (!currentRecommendation) {
			return res.status(404).send('Recommendation of given id not found');
		}

		currentRecommendation.status = 'accepted';

		fs.writeFile(
			__dirname + '/' + 'recommendations.json',
			JSON.stringify(recommendations),
			'utf8',
			(err) => {
				if (err) {
					return res.status(500).send('Error updating recommendation status');
				}
				console.log('Recommendation accepted');
				res.status(200).send('Recommendation status updated successfully');
			}
		);
	});
});

app.put('/recommendations/:id/reject', (req, res) => {
	const recommendationId = req.params.id;

	fs.readFile(__dirname + '/' + 'recommendations.json', 'utf8', (err, data) => {
		if (err) {
			return res
				.status(500)
				.send('Error retrieving data from recommendations file');
		}

		let recommendations = JSON.parse(data);

		const currentRecommendation = recommendations.find(
			(recommendation) => recommendation.id === recommendationId
		);

		if (!currentRecommendation) {
			return res.status(404).send('Recommendation of given id not found');
		}

		currentRecommendation.status = 'rejected';

		fs.writeFile(
			__dirname + '/' + 'recommendations.json',
			JSON.stringify(recommendations),
			'utf8',
			(err) => {
				if (err) {
					return res.status(500).send('Error updating recommendation status');
				}
				console.log('Recommendation rejected');
				res.status(200).send('Recommendation status updated successfully');
			}
		);
	});
});

app.listen(PORT_NUMBER, () => {
	console.log(`Srver is running on port ${PORT_NUMBER}`);
});
