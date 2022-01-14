import express from "express";
import fileUpload from "express-fileupload";
import _ from "lodash/fp.js";
import accomodate from "./accomodate.js";
import * as fs from "fs/promises";

const app = express();
app.use(fileUpload());

app.get('/v1/meta/:name', (req, res) => {
	// TODO: check that name looks plausible
	const metaName = '/persistence/' + req.params.name + '/meta.json';
	fs.readFile(metaName)
		.then((data) => res.send(JSON.parse(data)))
		.catch(() => res.send("404 not found"))// TODO: proper machine friendly 404
});

app.get('/v1/file/:name', (req, res) => {
	// TODO: check that name looks plausible
	const filename = '/persistence/' + req.params.name + '/file';
	const metaName = '/persistence/' + req.params.name + '/meta.json';
	fs.readFile(metaName)
		.then(JSON.parse)
		.then((data) => {
			res.type(data.mimetype);
			res.attachment(data.name);
		})
		.then(() => res.sendFile(filename))
		.catch(() => res.send("404 not found"))// TODO: proper machine friendly 404
});

app.post('/v1/upload', (req, res) => {
	const files = _.values(req.files);
	if (!files || files.length != 1) {
		return res.send({
			success: false,
			error: true,
			errorMessage: "You have to post exactly 1 file"
		});
	}
	accomodate(files[0], {}, {persistence: '/persistence'})
		.then((path) => res.send({success: true, error: false, path}))
});



app.listen(8080, () => console.log("Ready!"));
