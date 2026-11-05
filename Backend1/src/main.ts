import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // globely add validator all the routes
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
    // explicate data type conversion
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
