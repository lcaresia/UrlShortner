import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from '@/link/link.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    LinkModule,
  ],
})
export class AppModule { }
