import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateExampleUseCase } from './application/use-cases/create-example.use-case';
import { DeleteExampleUseCase } from './application/use-cases/delete-example.use-case';
import { FindAllExamplesUseCase } from './application/use-cases/find-all-examples.use-case';
import { FindExampleByIdUseCase } from './application/use-cases/find-example-by-id.use-case';
import { UpdateExampleUseCase } from './application/use-cases/update-example.use-case';
import { EXAMPLE_REPOSITORY } from './domain/repositories/example.repository.interface';
import { ExampleEntity } from './infrastructure/persistence/entities/example.entity';
import { TypeOrmExampleRepository } from './infrastructure/persistence/repositories/typeorm-example.repository';
import { ExampleController } from './presentation/controllers/example.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ExampleEntity])],
	controllers: [ExampleController],
	providers: [
		{ provide: EXAMPLE_REPOSITORY, useClass: TypeOrmExampleRepository },
		CreateExampleUseCase,
		FindAllExamplesUseCase,
		FindExampleByIdUseCase,
		UpdateExampleUseCase,
		DeleteExampleUseCase,
	],
})
export class ExampleModule {}
