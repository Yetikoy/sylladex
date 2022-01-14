import express from "express";
import fileUpload from "express-fileupload";
import _ from "lodash/fp.js";
import accomodate from "./accomodate.js";

const app = express();
app.use(fileUpload());

app.post('/upload', (req, res) => {
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
