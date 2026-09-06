import { Inject, Injectable } from '@nestjs/common';
import { ApiException } from '@shared/domain/exceptions/api.exception';
import { ExampleException } from '@shared/domain/exceptions/example.exception';
import {
	EXAMPLE_REPOSITORY,
	type ExampleRepository,
} from '../../domain/repositories/example.repository.interface';

@Injectable()
export class DeleteExampleUseCase {
	constructor(
		@Inject(EXAMPLE_REPOSITORY)
		private readonly exampleRepository: ExampleRepository,
	) {}

	async execute(id: string): Promise<void> {
		const existing = await this.exampleRepository.findById(id);

		if (!existing) {
			throw ExampleException.notFound();
		}

		try {
			const deleted = await this.exampleRepository.delete(id);

			if (!deleted) {
				throw ExampleException.deleteError();
			}
		} catch (error) {
			if (error instanceof ApiException) {
				throw error;
			}

			throw ExampleException.deleteError([(error as Error).message]);
		}
	}
}
