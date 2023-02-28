import { promises } from 'fs';

export async function deleteFile(filename: string): Promise<void> {
	try {
		await promises.stat(filename);
	} catch {
		return;
	}

	await promises.unlink(filename);
}
