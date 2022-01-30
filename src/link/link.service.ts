import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Link, LinkDocument } from '@/schemas/link.schema';
import * as voucherCode from 'voucher-code-generator';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>) { }

  async create(url: string): Promise<Link> {
    return await this.linkModel.create({
      url: url,
      code: voucherCode.generate({ length: 6, count: 1 })[0],
      views: 0,
      uuid: uuid(),
    });
  }

  async getByUrl(url: string): Promise<Link> {
    return await this.linkModel.findOne({
      url: url,
    });
  }

  async getByCode(code: string): Promise<Link> {
    return await this.linkModel.findOne({
      code: code,
    });
  }

  async getByUuid(uuid: string): Promise<Link> {
    return await this.linkModel.findOne({
      uuid: uuid,
    });
  }

  async increaseView(code: string): Promise<void> {
    const link = await this.getByCode(code);

    await this.linkModel.updateOne(
      {
        code: code,
      },
      {
        views: link.views + 1,
      },
    );
  }
}
