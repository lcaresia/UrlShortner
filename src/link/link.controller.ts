import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from '@/link/link.service';
import { Response } from 'express';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) { }

  @Get(`:code`)
  async get(
    @Res() response: Response,
    @Param('code') code: string,
  ): Promise<unknown> {
    const link = await this.linkService.getByCode(code);

    if (!link) return `Nao encontramos nenhuma URL para esse codigo.`;

    this.linkService.increaseView(code);

    return response.redirect(link.url);
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body('url') url: string,
  ): Promise<unknown> {
    let link = await this.linkService.getByUrl(url);

    if (link) return `Essa URL ja foi encurtada.`;

    link = await this.linkService.create(url);

    return response.json({
      link: `${process.env.BASE_URL}/${link.code}`,
      info: `${process.env.BASE_URL}/info/${link.uuid}`,
    });
  }

  @Get(`info/:uuid`)
  async info(
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ): Promise<unknown> {
    const link = await this.linkService.getByUuid(uuid);

    if (!link) return `Esse link nao foi encontrado.`;

    return response.json({
      views: link.views,
    });
  }
}
