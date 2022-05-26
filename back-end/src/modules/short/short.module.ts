import { Module } from "@nestjs/common";
import { ShortController } from "./short.controller";
import { ShortService } from "./short.service";
import { Url } from '../../entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [ShortController],
  providers: [ShortService]
})
export class ShortModule {}
