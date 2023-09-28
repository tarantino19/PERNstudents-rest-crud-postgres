const express = require('express');
const app = express();
const PORT = 3000;
const studentRoutes = require('./src/student/routes');

app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Hello World!`);
});

app.use('/api/v1/students', studentRoutes);

app.listen(PORT || 3000, () => {
	console.log(`Listening on port ${PORT}`);
});
