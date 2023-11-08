import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ApiResponse {
  @Field()
  success: string;

  @Field()
  message: string;

}
