exports.run = (client) => {
	const express = require('express');
	const colors = require('colors');
	const fs = require('fs');

	const app = express();
	const port = 8080;

	app.use(require('body-parser').urlencoded({
		extended: true
	}));
	app.use(require('body-parser').json());

	// Add headers
	let util = {};
	let routs = fs.readdirSync('./Routs/');

	// https://localhost/api/{ROUT}

	// CORS
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	  next();
	});

	// Redirect to main site
	app.get('/api/', (req, res) => {
		res.redirect('/');
	});
	// Map all routs
	routs.map(async (file) => {
		let rout = require(`./Routs/${file}`);
		let type = rout.type == 'GET' ? `GET`.magenta : `POST`.blue;

		console.log(`${`Loaded`.green} ${type} ${`${file}`.yellow}`);

		// GET endpoints
		if (rout.type == 'GET') {
			app.get(`/api/${file.replace(/\.js$/, '')}`, (req, res) => require(`./Routs/${file}`).run(req, res, util, client));

		}
		// POST endpoints
		else if (rout.type == 'POST') {
			app.post(`/api/${file.replace(/\.js$/, '')}`, (req, res) => require(`./Routs/${file}`).run(req, res, util, client));
		}
	});

	// Run server
	app.listen(port, () => console.log(`Connected to express on port: ${port}`.green))
}
