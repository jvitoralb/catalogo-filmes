import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    home() {
        return `
            <p><a href='https://github.com/jvitoralb/catalogo-filmes#readme'>Documentação</a></p>
            <p><a href='/api'>Swagger UI</a></p>
        `
    }
}