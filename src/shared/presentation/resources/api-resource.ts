import { HttpStatus } from '@nestjs/common';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

interface PaginatedData {
	items: unknown[];
	links: IPaginationLinks;
	meta: IPaginationMeta;
}

export class ApiResource {
	/**
	 * Success response
	 * @param [data]
	 * @returns SuccessResponseInterface
	 */
	static successResponse(data?: Record<string, unknown>): SuccessResponseInterface {
		if (!data) {
			return { status: { code: HttpStatus.OK, message: 'OK' } };
		}

		if ('items' in data) {
			const { items, links, meta } = data as unknown as PaginatedData;

			return {
				data: items,
				links,
				meta,
				status: { code: HttpStatus.OK, message: 'OK' },
			};
		}

		return { data, status: { code: HttpStatus.OK, message: 'OK' } };
	}

	/**
	 * Errors response
	 * @param error
	 */
	static errorResponse(error: Error): ErrorResponseInterface {
		// All exception will be handle by exception filters
		throw error;
	}
}

export interface SuccessResponseInterface {
	status: { code: number; message: string };
	data?: Record<string, unknown> | unknown[];
	links?: IPaginationLinks;
	meta?: IPaginationMeta;
}

export interface ErrorResponseInterface {
	status: { code: number; message: string };
	error: { code: number; message: string; errors: string[] };
}
