
// importing all the necessary libraries
const database = require('./operations');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// creating an instance of express class and a router for routing.
const app = express();
const router = express.Router();

// defining how we parse the request body using BodyParser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

// This is the our base route, all the routes are added after "/api/"
app.use('/api', router);


// Route "/api/instances" for getting all the instances from the database.
router.route('/instances').get((req, res) => {
	database.getInstances().then((result) => {
		if (result){
			return res.json(result);
		}else{
			return res.json({
				message: "Empty Database"
			});
		}
	})
});


// Route "/api/get-instance/:id" for getting a particular instance from the database.
// using the instance id, which is passed through the route.
router.route("/get-instance/:id").get((req, res) => {
	// getting the instance id from the request parameters.
	const instanceid = req.params.id;
	database.getInstance(instanceid).then((result) => {
		return res.json(result);
	})
});


// Route "/api/add-instance" for adding a new instance to the database.
router.route("/add-instance").post((req, res) => {
	let instance = {...req.body};
	database.addInstance(instance).then((result) => {
		return res.status(201).json(result);
	})
});


// Route "/api/delete-instance/:id" for deleting a particular instance from the database.
// using the instance id, which is passed through the route.
router.route("/delete-instance/:id").get((req, res) => {
	// getting the instance id from the request parameters.
	const instanceid = req.params.id;
	database.deleteInstance(instanceid).then(() => {
		return res.status(200).json({message: `Instance id ${instanceid} deleted successfully.`});
	})
});

// defining the port number
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is up and running on ${port}`);
})
