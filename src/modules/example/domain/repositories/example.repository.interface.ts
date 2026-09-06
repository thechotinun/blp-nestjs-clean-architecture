import type { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Example } from '../entities/example.entity';

export const EXAMPLE_REPOSITORY = 'EXAMPLE_REPOSITORY';

export interface CreateExampleData {
	name: string;
	description?: string;
}

export interface UpdateExampleData {
	name?: string;
	description?: string;
}

export interface ExampleRepository {
	findAll(): Promise<Example[]>;
	findById(id: string): Promise<Example | null>;
	create(data: CreateExampleData): Promise<Example>;
	update(id: string, data: UpdateExampleData): Promise<Example | null>;
	delete(id: string): Promise<boolean>;
	paginate(options: IPaginationOptions): Promise<Pagination<Example>>;
}
