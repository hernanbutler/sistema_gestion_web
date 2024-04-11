import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'; 
import { AuthModule } from './auth/auth.module';


//--Ver si realizamos un .ENV o conectamos directo a la DB--//
//--Robustecer Password--//
//--Generar Usuario mysql--//
//--El Host solamente es de forma local por el momento--//


@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username:'admin',
      password: '1234',
      database:'sistema_gestion',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //----autoLoadEntities:true---//
      synchronize:true //--False--//
    }),
    ItemsModule, 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
