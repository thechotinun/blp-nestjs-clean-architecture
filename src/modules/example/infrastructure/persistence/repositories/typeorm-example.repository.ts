import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@shared/infrastructure/persistence/repositories/base.repository';
import { Example } from '../../../domain/entities/example.entity';
import type { ExampleRepository } from '../../../domain/repositories/example.repository.interface';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleMapper } from '../mappers/example.mapper';

@Injectable()
export class TypeOrmExampleRepository
	extends BaseRepository<ExampleEntity, Example>
	implements ExampleRepository
{
	constructor(
		@InjectRepository(ExampleEntity)
		repository: Repository<ExampleEntity>,
	) {
		super(repository);
	}

	protected toDomain(entity: ExampleEntity): Example {
		return ExampleMapper.toDomain(entity);
	}
}
