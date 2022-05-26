import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UrlDto {
  @Field((_type) => Int, { nullable: true })
  id?: number;

  @Field()
  token: string;

  @Field()
  origin: string;
}
