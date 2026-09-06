import type { DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { paginate, type IPaginationOptions, type Pagination } from 'nestjs-typeorm-paginate';

export abstract class BaseRepository<Entity extends ObjectLiteral & { id: string }, Domain> {
	constructor(protected readonly repository: Repository<Entity>) {}

	protected abstract toDomain(entity: Entity): Domain;

	async findAll(): Promise<Domain[]> {
		const entities = await this.repository.find();

		return entities.map((entity) => this.toDomain(entity));
	}

	async findById(id: string): Promise<Domain | null> {
		const entity = await this.repository.findOneBy({ id } as FindOptionsWhere<Entity>);

		return entity ? this.toDomain(entity) : null;
	}

	async create(data: DeepPartial<Entity>): Promise<Domain> {
		const entity = this.repository.create(data);
		const saved = await this.repository.save(entity);

		return this.toDomain(saved);
	}

	async update(id: string, data: DeepPartial<Entity>): Promise<Domain | null> {
		const entity = await this.repository.findOneBy({ id } as FindOptionsWhere<Entity>);

		if (!entity) {
			return null;
		}

		Object.assign(entity, data);
		const saved = await this.repository.save(entity);

		return this.toDomain(saved);
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.repository.softDelete(id);

		return !!result.affected;
	}

	async paginate(options: IPaginationOptions): Promise<Pagination<Domain>> {
		const result = await paginate<Entity>(this.repository, options);

		return {
			items: result.items.map((entity) => this.toDomain(entity)),
			links: result.links,
			meta: result.meta,
		};
	}
}
