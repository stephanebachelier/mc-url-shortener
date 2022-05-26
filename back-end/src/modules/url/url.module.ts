import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { Url } from '../../entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlResolver } from './url.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService, UrlResolver],
})
export class UrlModule {}
