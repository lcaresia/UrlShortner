import { Module } from '@nestjs/common';
import { LinkController } from '@/link/link.controller';
import { LinkService } from '@/link/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from '@/schemas/link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule { }
