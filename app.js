const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');

// Url Encoded and BodyParser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer({ dest: '/public/uploads' }).single('upfile'), (req, res) => {
	if (!req.file) res.json({ error: 'Invalid File' });

	const { originalname, mimetype, size } = req.file;

	res.json({
		name: originalname,
		type: mimetype,
		size
	});
});

app.get('*', (req, res) =>
	res.json({ success: true, description: 'This is Another Page.', uri: `${req.baseUrl}/timestamp/:date_string` })
);
app.listen(port, _ => console.log(`Server's running @ ${port}`));
