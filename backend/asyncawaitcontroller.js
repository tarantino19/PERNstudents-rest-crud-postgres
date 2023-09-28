//this is just the async await version of the controller generated from chat gpt

const getStudents = async (req, res) => {
	try {
		const results = await pool.query(queries.getStudents);
		res.status(200).json(results.rows);
	} catch (error) {
		throw error;
	}
};

const getStudentById = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		const results = await pool.query(queries.getStudentById, [id]);
		res.status(200).json(results.rows);
	} catch (error) {
		throw error;
	}
};

const addStudent = async (req, res) => {
	const { name, email, age, dob } = req.body;

	try {
		const emailCheckResults = await pool.query(queries.checkEmailExists, [email]);

		if (emailCheckResults.rows.length) {
			res.send('Email already exists');
		} else {
			const addStudentResult = await pool.query(queries.addStudent, [name, email, age, dob]);
			res.status(201).send('Student added successfully');
		}
	} catch (error) {
		throw error;
	}
};

const removeStudent = async (req, res) => {
	const id = parseInt(req.params.id);

	try {
		const studentResults = await pool.query(queries.getStudentById, [id]);
		const noStudentFound = !studentResults.rows.length;

		if (noStudentFound) {
			res.send(`Student does not exist in the database`);
		} else {
			await pool.query(queries.removeStudent, [id]);
			res.status(200).send(`Student number ${id} removed successfully`);
		}
	} catch (error) {
		throw error;
	}
};

const updateStudent = async (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email } = req.body;

	try {
		const studentResults = await pool.query(queries.getStudentById, [id]);
		const noStudentFound = !studentResults.rows.length;

		if (noStudentFound) {
			res.send(`Student does not exist in the database`);
		} else {
			await pool.query(queries.updateStudent, [name, email, id]);
			res.status(200).send(`Student updated successfully`);
		}
	} catch (error) {
		throw error;
	}
};
