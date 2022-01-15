import { v4 as uuid } from "uuid";
import * as fs from "fs/promises";
import _ from "lodash/fp.js";

class FileStorage {
	#config;
	constructor(config) {
		this.config = config;
	};
	async put(file) {
		const path = uuid();
		const fullPath = this.config.persistencePath + '/' + path;
		await fs.mkdir(fullPath);
		await file.mv(fullPath + '/file');
		const metaData = _.pick(['name', 'size', 'encoding', 'mimetype', 'md5'])(file);
		await fs.writeFile(fullPath + '/meta.json', JSON.stringify(metaData));
		return path;
	};
	getFilename(name) {return this.config.persistencePath + '/' + name + '/file';}
	getMetaname(name) {return this.config.persistencePath + '/' + name + '/meta.json';}
	async getMeta(name) {return fs.readFile(this.getMetaname(name)).then(JSON.parse);};

};


export default FileStorage;
