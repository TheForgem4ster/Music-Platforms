import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateTrackDto {
  @ApiProperty({ example: 'Track 1', description: 'Track name' })
  readonly name;

  @ApiProperty({ example: 'Maksym', description: 'Artist name' })
  readonly artist;
  @ApiProperty({
    example:
      "Verse 1:Walking down the street\n With my head up high\n Feeling the sunshine\n On my skin, oh my\n Nothing's gonna bring me down\n I'm unstoppable now",
    description: 'Lyrics',
  })
  readonly text;

  @ApiProperty({
    example: '{63ff69f93e2a577dcff552d0}',
    description: 'AlbumId',
  })
  readonly albumId: ObjectId;
}
