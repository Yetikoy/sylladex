import { v4 as uuid } from "uuid";
import * as fs from "fs/promises";
import _ from "lodash/fp.js";

const accomodate = async (file, fileParams, params) => {
	const path = './files/' + uuid();
	await fs.mkdir(path);
	await file.mv(path + '/file');
	const metaData = _.pick(['name', 'size', 'encoding', 'mimetype', 'md5'])(file);
	await fs.writeFile(path + '/meta.json', JSON.stringify(metaData));
	return path;
};

export default accomodate;
