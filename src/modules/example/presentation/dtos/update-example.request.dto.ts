import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateExampleRequestDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string;

	@IsOptional()
	@IsString()
	@MaxLength(500)
	description?: string;
}
