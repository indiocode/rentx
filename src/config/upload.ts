import { randomBytes } from 'crypto';
import type { StorageEngine } from 'multer';
import multer from 'multer';
import { resolve } from 'path';

interface IUpload {
	storage: StorageEngine;
}

export default function upload(folder: string): IUpload {
	return {
		storage: multer.diskStorage({
			destination: resolve(__dirname, '..', '..', folder),
			filename: (request, file, callback) => {
				const fileHash = randomBytes(16).toString('hex');
				const fileName = `${fileHash}-${file.originalname}`;

				return callback(null, fileName);
			},
		}),
	};
}
