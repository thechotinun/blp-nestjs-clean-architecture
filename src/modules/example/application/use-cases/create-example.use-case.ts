import { Inject, Injectable } from '@nestjs/common';
import { ExampleException } from '@shared/domain/exceptions/example.exception';
import { Example } from '../../domain/entities/example.entity';
import {
	EXAMPLE_REPOSITORY,
	type CreateExampleData,
	type ExampleRepository,
} from '../../domain/repositories/example.repository.interface';

@Injectable()
export class CreateExampleUseCase {
	constructor(
		@Inject(EXAMPLE_REPOSITORY)
		private readonly exampleRepository: ExampleRepository,
	) {}

	async execute(data: CreateExampleData): Promise<Example> {
		try {
			return await this.exampleRepository.create(data);
		} catch (error) {
			throw ExampleException.createError([(error as Error).message]);
		}
	}
}
