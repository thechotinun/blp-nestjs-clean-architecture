import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from '@shared/presentation/filters/exception.filter';
import { ValidationException } from '@shared/presentation/filters/validation.exception';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService);

	app.setGlobalPrefix('api/v1');

	app.enableCors({
		origin: '*',
		methods: 'GET, PUT, PATCH, POST, DELETE',
		allowedHeaders: 'Content-Type, Authorization',
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory: (errors) =>
				new ValidationException(errors, HttpStatus.UNPROCESSABLE_ENTITY),
		}),
	);
	app.useGlobalFilters(new ExceptionFilter());

	const isDevelopmentMode =
		configService.get<'test' | 'develop' | 'production'>('mode') !== 'production';
	//eslint-disable-next-line no-console
	console.log(`isDevelopmentMode =>`, isDevelopmentMode);

	await app.listen(configService.get<number>('port') || 3000);
}
bootstrap();
