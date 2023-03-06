import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type {
	IDateProvider,
	IRequestDate,
} from '~/shared/container/providers/DateProvider/IDateProvider';

dayjs.extend(utc);

export default class DayjsDateProvider implements IDateProvider {
	compareInHours(data: IRequestDate): number {
		const end_date_utc = this.convertToUTC(data.end_date);
		const start_date_utc = this.convertToUTC(data.start_date);

		return dayjs(end_date_utc).diff(start_date_utc, 'hours');
	}

	convertToUTC(date: Date): string {
		return dayjs(date).utc().local().format();
	}

	dateNow(): Date {
		return dayjs().toDate();
	}

	compareInDays(data: IRequestDate): number {
		const end_date_utc = this.convertToUTC(data.end_date);
		const start_date_utc = this.convertToUTC(data.start_date);

		return dayjs(end_date_utc).diff(start_date_utc, 'days');
	}

	addDays(days: number): Date {
		return dayjs().add(days, 'days').toDate();
	}

	addHours(hours: number): Date {
		return dayjs().add(hours, 'hour').toDate();
	}

	compareIfBefore(data: IRequestDate): boolean {
		return dayjs(data.start_date).isBefore(data.end_date);
	}
}
