import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    views: number;

    @Prop({ required: true })
    uuid: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
