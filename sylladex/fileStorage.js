import { v4 as uuid } from "uuid";
import * as fs from "fs/promises";
import _ from "lodash/fp.js";

class FileStorage {
	#config;
	constructor(config) {
		this.config = config;
	};
	getDir(name) {return this.config.persistencePath + '/' + name;};
	getFilename(name) {return this.getDir(name) + '/file';};
	getMetaname(name) {return this.getDir(name) + '/meta.json';};

	async put(file) {
		const path = uuid();
		await fs.mkdir(this.getDir(path));
		await file.mv(this.getFilename(path));
		await this.writeMeta(path, _.pick(['name', 'size', 'encoding', 'mimetype', 'md5'])(file));
		return path;
	};
	async writeMeta(name, data) {return fs.writeFile(this.getMetaname(name), JSON.stringify(data))};
	async getMeta(name) {return fs.readFile(this.getMetaname(name)).then(JSON.parse);};
	async updateMeta(name, update) {return this.getMeta(name)
		.then((data) => this.writeMeta(_.merge(data, update)));
	};

};


export default FileStorage;
