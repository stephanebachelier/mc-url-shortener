import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../../entities/url.entity';
import { Repository } from 'typeorm';
import { count, timeStamp } from 'console';

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

  incrementCounter (token:string) {
    if (!token) {
      return null
    }

    // seems OK to prevent SQL injection as `token` will be escaped before
    // being injected as `:token` parameter
    return this.repository.createQueryBuilder()
      .update()
      .set({
        count: () => "count + 1"
      })
      .where("token = :token", { token })
      .execute()

  }
}
