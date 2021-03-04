const db = require('../helpers/database');




/* - - - - Creation - - - - */

// Register new dog on system
exports.newDog = async function newDog(dog) {
	const query = "INSERT INTO dogs SET ?";

	let result = await db.exec(query, dog);

	return result;
}


/* - - - - Retrieval - - - - */

// Returns all dogs in database
exports.getAll = async function getAll() {
	const query = "SELECT * FROM dogs;"

	let result = await db.exec(query);

	return result;
}


// Returns all dog records at specific site
exports.getByStoreId = async function getByStoreId(id) {
	const query = "SELECT * FROM dogs WHERE SiteID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


// Returns all dog records listed as specified breed
exports.getByBreed = async function getByBreed(breed) {
	const query = "SELECT * FROM dogs WHERE Breed = ?;";
	const data = [breed];

	let result = await db.exec(query, data);

	return result;
}


// Returns dog record specified by ID
exports.getById = async function getById(id) {
	const query = "SELECT * FROM dogs WHERE ID = ?;";
	const data = [id];

	let result = await db.exec(query, data);

	return result;
}


/* - - - - Updating - - - - */



/* - - - - Deletion - - - - */
