import { Expose } from 'class-transformer';
import type { IPaginationMeta, IPaginationLinks } from 'nestjs-typeorm-paginate';

export class ResourceDto {
	@Expose()
	status: {
		code: number;
		message: string;
	};
}

export class ResourceWithPaginateDto {
	@Expose()
	status: {
		code: number;
		message: string;
	};

	@Expose()
	meta: IPaginationMeta;

	@Expose()
	links: IPaginationLinks;
}
