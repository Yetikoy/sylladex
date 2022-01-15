import express from "express";
import fileUpload from "express-fileupload";
import _ from "lodash/fp.js";
import FileStorage from './accomodate.js';
import * as fs from "fs/promises";

const app = express();
app.use(fileUpload());

const files = new FileStorage({persistencePath:'/persistence'});

// TODO investigate express + promises, maybe streamline it all a bit
app.get('/v1/meta/:name', (req, res) => {
	files.getMeta(req.params.name)
		.then(res.send(data))
		.catch(() => res.send("404 not found"))// TODO: proper machine friendly 404
});

app.get('/v1/file/:name', (req, res) => {
	files.getMeta(req.params.name)
		.then((data) => {
			res.type(data.mimetype);
			res.attachment(data.name);
		})
		.then(() => res.sendFile(files.getFilename(req.params.name)))
		.catch(() => res.send("404 not found"))// TODO: proper machine friendly 404
});

app.post('/v1/upload', (req, res) => {
	const newFiles = _.values(req.files);
	if (!newFiles || newFiles.length != 1) {
		return res.send({
			success: false,
			error: true,
			errorMessage: "You have to post exactly 1 file"
		});
	}
	files.put(newFiles[0])
		.then((path) => res.send({success: true, error: false, path}))
});



app.listen(8080, () => console.log("Ready!"));
