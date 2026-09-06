import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '@config/configuration';
import TypeOrmConfigService from '@config/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModule } from './modules/example/example.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			load: [configuration],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
		ExampleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
