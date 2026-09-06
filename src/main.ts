import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService);

	app.enableCors({
		origin: '*',
		methods: 'GET, PUT, PATCH, POST, DELETE',
		allowedHeaders: 'Content-Type, Authorization',
	});

	const isDevelopmentMode =
		configService.get<'test' | 'develop' | 'production'>('mode') !== 'production';
	//eslint-disable-next-line no-console
	console.log(`isDevelopmentMode =>`, isDevelopmentMode);

	await app.listen(configService.get<number>('port') || 3000);
}
bootstrap();
