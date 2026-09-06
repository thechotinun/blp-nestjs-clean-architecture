import { Expose } from 'class-transformer';

export class ExampleResourceDto {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	description: string | null;

	@Expose()
	isActive: boolean;

	@Expose()
	createdDate: Date;

	@Expose()
	updatedDate: Date;
}
