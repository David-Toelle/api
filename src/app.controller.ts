import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('')
  getHi(): string {
    return this.appService.getHi();
  }
  

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
