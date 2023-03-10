/* eslint-disable no-unused-vars */
import type { NextFunction, Request, Response } from 'express';

import AppError from '~/shared/errors/AppError';

export function errorResponse(
	err: Error,
	request: Request,
	response: Response,
	next: NextFunction,
): Response {
	if (err instanceof AppError)
		return response.status(err.statusCode).json({
			message: err.message,
		});

	return response.status(500).json({
		status: 'error',
		message: `Internal Server Error: ${err.message}`,
	});
}
