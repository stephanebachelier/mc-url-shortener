import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../../entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortService {
  constructor(
    @InjectRepository(Url)
    private repository: Repository<Url>,
  ) {}

  findByToken(token: string): Promise<Url> {
    if (!token) {
      return null
    }

    return this.repository.findOne({
      select: ['origin'],
      where: {
        token: token
      }
    })
  }
}
