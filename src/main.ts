import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4300;

  const config = new DocumentBuilder()
      .setTitle('sample')
      .setDescription('sample api')
      .setVersion('1.0')
      .addTag('tag')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port).then(() => console.log(`app listening to port: ${port}`));
}
bootstrap();
