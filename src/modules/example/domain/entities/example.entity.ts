export interface ExampleProps {
	id: string;
	name: string;
	description: string | null;
	createdDate: Date;
	updatedDate: Date;
	isActive: boolean;
}

export class Example {
	readonly id: string;
	name: string;
	description: string | null;
	readonly createdDate: Date;
	updatedDate: Date;
	isActive: boolean;

	constructor(props: ExampleProps) {
		this.id = props.id;
		this.name = props.name;
		this.description = props.description;
		this.createdDate = props.createdDate;
		this.updatedDate = props.updatedDate;
		this.isActive = props.isActive;
	}
}
