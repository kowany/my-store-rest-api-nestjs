import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    const dbName = this.configService.get<string>('DATABASE_NAME');
    console.log(this.tasks);
    return `Hello World! ${apiKey} ${dbName}`;
  }
}
