import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Catálogo de filmes')
        .setDescription('REST API Usada para manusear um catálogo de filmes')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const customOptions: SwaggerCustomOptions = {
        customSiteTitle: 'Catalogo API - Swagger UI',
    };

    SwaggerModule.setup('api', app, document, customOptions);
}