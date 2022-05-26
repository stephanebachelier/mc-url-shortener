import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UrlDto } from './url.dtos';
import { UrlService } from './url.service';

@Resolver()
export class UrlResolver {
  constructor(private urlService: UrlService) {}

  @Query((_returns) => [UrlDto])
  urls() {
    return this.urlService.findAll();
  }

  @Mutation((_returns) => UrlDto)
  url(@Args('origin', { type: () => String }) origin: string) {
    return this.urlService.save(origin);
  }
}
