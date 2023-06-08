import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  @ApiProperty({ example: 'Illia', description: 'User name' })
  readonly username: string;

  @ApiProperty({
    example: 'This track is lit!',
    description: 'String with user comment',
  })
  readonly text: string;

  @ApiProperty({
    example: '63ff69f93e2a577dcff552d0',
    description: 'Id of the track',
  })
  readonly trackId: ObjectId;
}
