import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared/infrastructure/persistence/entities/base.entity';

@Entity('examples')
export class ExampleEntity extends BaseEntity {
	@Column({ type: 'varchar', length: 255 })
	name: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	description: string | null;
}
