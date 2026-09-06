import { Inject, Injectable } from '@nestjs/common';
import { ExampleException } from '@shared/domain/exceptions/example.exception';
import { Example } from '../../domain/entities/example.entity';
import {
	EXAMPLE_REPOSITORY,
	type ExampleRepository,
} from '../../domain/repositories/example.repository.interface';

@Injectable()
export class FindExampleByIdUseCase {
	constructor(
		@Inject(EXAMPLE_REPOSITORY)
		private readonly exampleRepository: ExampleRepository,
	) {}

	async execute(id: string): Promise<Example> {
		const example = await this.exampleRepository.findById(id);

		if (!example) {
			throw ExampleException.notFound();
		}

		return example;
	}
}
