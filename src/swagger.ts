import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Catálogo de filmes')
        .setDescription('REST API Usada para manusear um catálogo de filmes')
        .setVersion('1.0')
        // .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // const customOptions: SwaggerCustomOptions = {
    //     swaggerOptions: {
    //       persistAuthorization: true,
    //       // defaultModelsExpandDepth: -1,
    //     },
    //     customSiteTitle: swaggerConfig.siteTitle,
    //   };

    SwaggerModule.setup('api', app, document);
}