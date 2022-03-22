import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { lastValueFrom } from 'rxjs';

const API_KEY = '124345634';
const API_KEY_PROD = 'PROD123456';

@Module({
  imports: [ProductsModule, UsersModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: (process.env.MODE_ENV = 'prod' ? API_KEY_PROD : API_KEY),
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const todos$ = http.get('https://jsonplaceholder.typicode.com/todos/');
        const tasks = await lastValueFrom(todos$);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
// El useFactory tiene dos características, es
// asíncrono y también recibe inyecciones en
// el mismos. No hay que utilizarlo para conexiones
// externa porque detendría el inicio de la aplicación,
// es recomendado en conexiones a BBDD. El httpModule
// lo podemos utilizar en un servicio
