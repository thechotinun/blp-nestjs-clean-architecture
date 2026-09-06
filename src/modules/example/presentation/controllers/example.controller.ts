import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiResource } from '@shared/presentation/resources/api-resource';
import { PaginateQuery } from '@shared/presentation/dto/paginate-query.dto';
import { CreateExampleUseCase } from '../../application/use-cases/create-example.use-case';
import { DeleteExampleUseCase } from '../../application/use-cases/delete-example.use-case';
import { FindAllExamplesUseCase } from '../../application/use-cases/find-all-examples.use-case';
import { FindExampleByIdUseCase } from '../../application/use-cases/find-example-by-id.use-case';
import { UpdateExampleUseCase } from '../../application/use-cases/update-example.use-case';
import { CreateExampleRequestDto } from '../dtos/create-example.request.dto';
import { UpdateExampleRequestDto } from '../dtos/update-example.request.dto';
import { ExampleResourceDto } from '../resources/example.resource';

@Controller('examples')
export class ExampleController {
	constructor(
		private readonly createExampleUseCase: CreateExampleUseCase,
		private readonly findAllExamplesUseCase: FindAllExamplesUseCase,
		private readonly findExampleByIdUseCase: FindExampleByIdUseCase,
		private readonly updateExampleUseCase: UpdateExampleUseCase,
		private readonly deleteExampleUseCase: DeleteExampleUseCase,
	) {}

	@Get()
	async findAll(@Query() query: PaginateQuery) {
		const paginated = await this.findAllExamplesUseCase.execute({
			page: query.page,
			limit: query.limit,
			route: 'api/v1/examples',
		});
		const resources = paginated.items.map((example) =>
			plainToInstance(ExampleResourceDto, example, { excludeExtraneousValues: true }),
		);

		return ApiResource.successResponse({
			items: resources,
			links: paginated.links,
			meta: paginated.meta,
		});
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const example = await this.findExampleByIdUseCase.execute(id);
		const resource = plainToInstance(ExampleResourceDto, example, {
			excludeExtraneousValues: true,
		});

		return ApiResource.successResponse(resource);
	}

	@Post()
	async create(@Body() body: CreateExampleRequestDto) {
		const example = await this.createExampleUseCase.execute(body);
		const resource = plainToInstance(ExampleResourceDto, example, {
			excludeExtraneousValues: true,
		});

		return ApiResource.successResponse(resource);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() body: UpdateExampleRequestDto) {
		const example = await this.updateExampleUseCase.execute(id, body);
		const resource = plainToInstance(ExampleResourceDto, example, {
			excludeExtraneousValues: true,
		});

		return ApiResource.successResponse(resource);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async remove(@Param('id') id: string) {
		await this.deleteExampleUseCase.execute(id);

		return ApiResource.successResponse();
	}
}
