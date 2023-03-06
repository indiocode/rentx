/* eslint-disable no-unused-vars */

export interface IRequestDate {
	start_date: Date;
	end_date: Date;
}

export interface IDateProvider {
	compareInHours(data: IRequestDate): number;
	convertToUTC(date: Date): string;
	dateNow(): Date;
	compareInDays(data: IRequestDate): number;
	addDays(days: number): Date;
	addHours(hours: number): Date;
	compareIfBefore(data: IRequestDate): boolean;
}
