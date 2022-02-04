import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from '@/link/link.service';
import { Response } from 'express';

@Controller()
export class LinkController {
  constructor(private readonly linkService: LinkService) { }

  cached: { [key: string]: string } = {};

  @Get(`:code`)
  async get(
    @Res() response: Response,
    @Param('code') code: string,
  ): Promise<unknown> {
    let url = this.cached[code];

    if (!url) {
      const link = await this.linkService.getByCode(code);

      url = link.url;
    }

    if (!url)
      return response.send(`Nao encontramos nenhuma URL para esse codigo.`);

    this.linkService.increaseView(code);

    return response.redirect(
      url.includes('https://') || url.includes('http://')
        ? url
        : `https://${url}`,
    );
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body('url') url: string,
  ): Promise<unknown> {
    const link = await this.linkService.create(url);

    return response.json({
      link: `${process.env.BASE_URL}/${link.code}`,
      infoUuidUrl: `${process.env.BASE_URL}/info/${link.uuid}`,
      infoUuid: link.uuid,
    });
  }

  @Get(`info/:uuid`)
  async info(
    @Res() response: Response,
    @Param('uuid') uuid: string,
  ): Promise<unknown> {
    const link = await this.linkService.getByUuid(uuid);

    if (!link) return response.send(`Esse link nao foi encontrado.`);

    return response.json({
      views: link.views,
    });
  }
}
