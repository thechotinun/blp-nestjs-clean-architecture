import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '@shared/domain/exceptions/api.exception';
import { ExampleException } from '@shared/domain/exceptions/example.exception';
import { Example } from '../../domain/entities/example.entity';
import {
	EXAMPLE_REPOSITORY,
	type ExampleRepository,
	type UpdateExampleData,
} from '../../domain/repositories/example.repository.interface';

@Injectable()
export class UpdateExampleUseCase {
	constructor(
		@Inject(EXAMPLE_REPOSITORY)
		private readonly exampleRepository: ExampleRepository,
	) {}

	async execute(id: string, data: UpdateExampleData): Promise<Example> {
		try {
			const example = await this.exampleRepository.update(id, data);

			if (!example) {
				throw ExampleException.notFound();
			}

			return example;
		} catch (error) {
			if (error instanceof ApiException) {
				throw error;
			}

			throw ExampleException.updateError([(error as Error).message]);
		}
	}
}
