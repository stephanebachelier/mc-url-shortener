import { Controller, Get, Injectable, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ShortService } from './short.service';
@Injectable()
@Controller('short')
export class ShortController {
  constructor(
    private readonly service: ShortService
  ) {}

  @Get('/:token')
  async find(@Param() params, @Res() res: Response) {
    if (!params.token) {
      res.status(HttpStatus.NOT_FOUND).send('Not found')
      return
    }

    const d = await this.service.findByToken(params.token);

    if (!d) {
      res.status(HttpStatus.NOT_FOUND).send('Not found')
      return
    }

    res.redirect(HttpStatus.FOUND, d.origin)
  }
}