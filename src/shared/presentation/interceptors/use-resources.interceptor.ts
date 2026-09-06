import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
	new (...args: unknown[]): unknown;
}

export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: ClassConstructor) {}

	intercept(_context: ExecutionContext, handler: CallHandler): Observable<unknown> {
		return handler.handle().pipe(
			map((data: unknown) => {
				return plainToInstance(this.dto, data as Record<string, unknown>, {
					excludeExtraneousValues: true,
				});
			}),
		);
	}
}

export function UseResources(dto: ClassConstructor) {
	return UseInterceptors(new SerializeInterceptor(dto));
}
