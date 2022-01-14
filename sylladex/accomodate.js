import { v4 as uuid } from "uuid";
import * as fs from "fs/promises";
import _ from "lodash/fp.js";

const accomodate = async (file, fileParams, params) => {
	const path = uuid();
	const fullPath = params.persistence + '/' + path;
	await fs.mkdir(fullPath);
	await file.mv(fullPath + '/file');
	const metaData = _.pick(['name', 'size', 'encoding', 'mimetype', 'md5'])(file);
	await fs.writeFile(fullPath + '/meta.json', JSON.stringify(metaData));
	return path;
};

export default accomodate;
