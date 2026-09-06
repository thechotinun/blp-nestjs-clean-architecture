import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExampleRequestDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

	@IsOptional()
	@IsString()
	@MaxLength(500)
	description?: string;
}
