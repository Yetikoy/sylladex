// TODO: event on new id
//const EventEmitter = require('events');
import { customAlphabet } from "nanoid";
const mk_checksum = (alphabet) => {
	alphabet = Array(...alphabet);
	const indices = {};
	const size = alphabet.length;
	for (const [index, symbol] of alphabet.entries()) {
		indices[symbol] = index;
	}
	const check = (s) => {
		let result = 0;
		let sign = 1;
		for (const symbol of s) {
			result += indices[symbol] * sign;
			sign = -sign;
		}
		result = result % size;
		result += size
		result = result % size;
		return alphabet[result];
	};
	return check;
};

const mk_id = (alphabet, length) => {
	const nanoid = customAlphabet(alphabet, length-1);
	const checksum = mk_checksum(alphabet);
	const generate = () => {
		const raw = nanoid();
		return raw + checksum(raw);
	};
	generate.isValid = (s) => {
		if (s.length != length) return false;
		const raw = s.substring(0, length-1);
		const last = s.slice(-1);
		return last == checksum(raw);
	};
	return generate;
};

// 59 chars, missing I,l and O
const alphabet = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const nid = mk_id(alphabet, 13);

export default nid;


