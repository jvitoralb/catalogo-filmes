import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
    constructor(
        private readonly service: AppService
    ) { }

    @Public()
    @Get()
    getHome() {
        return this.service.home()
    }
}