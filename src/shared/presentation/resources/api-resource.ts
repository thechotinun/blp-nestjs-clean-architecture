import { HttpStatus } from '@nestjs/common';
import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

interface PaginatedData {
	items: unknown[];
	links: IPaginationLinks;
	meta: IPaginationMeta;
}

function isPaginatedData(data: unknown): data is PaginatedData {
	return typeof data === 'object' && data !== null && 'items' in data;
}

export class ApiResource {
	/**
	 * Success response
	 * @param [data]
	 * @returns SuccessResponseInterface
	 */
	static successResponse(data?: unknown): SuccessResponseInterface {
		if (!data) {
			return { status: { code: HttpStatus.OK, message: 'OK' } };
		}

		if (isPaginatedData(data)) {
			const { items, links, meta } = data;

			return {
				data: items,
				links,
				meta,
				status: { code: HttpStatus.OK, message: 'OK' },
			};
		}

		return {
			data: data as Record<string, unknown> | unknown[],
			status: { code: HttpStatus.OK, message: 'OK' },
		};
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
