import { Example } from '../../../domain/entities/example.entity';
import { ExampleEntity } from '../entities/example.entity';

export class ExampleMapper {
	static toDomain(entity: ExampleEntity): Example {
		return new Example({
			id: entity.id,
			name: entity.name,
			description: entity.description,
			createdDate: entity.createdDate,
			updatedDate: entity.updatedDate,
			isActive: !!entity.isActive,
		});
	}
}
