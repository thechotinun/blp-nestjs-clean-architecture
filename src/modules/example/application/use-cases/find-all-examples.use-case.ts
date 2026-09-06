import { Inject, Injectable } from '@nestjs/common';
import type { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Example } from '../../domain/entities/example.entity';
import {
	EXAMPLE_REPOSITORY,
	type ExampleRepository,
} from '../../domain/repositories/example.repository.interface';

@Injectable()
export class FindAllExamplesUseCase {
	constructor(
		@Inject(EXAMPLE_REPOSITORY)
		private readonly exampleRepository: ExampleRepository,
	) {}

	execute(options: IPaginationOptions): Promise<Pagination<Example>> {
		return this.exampleRepository.paginate(options);
	}
}
