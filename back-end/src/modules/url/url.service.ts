import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../../entities/url.entity';
import { Repository } from 'typeorm';
import { randomStr } from 'src/utils/randomString';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  save(url: string) {
    return this.urlRepository.save({ 
      token: randomStr(10),
      origin: url 
    });
  }

  findAll(): Promise<Url[]> {
    return this.urlRepository.find();
  }
}
