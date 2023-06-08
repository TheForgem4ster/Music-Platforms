import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddRoleDto {
  @IsString({ message: 'Must be a string' })
  readonly value: string;
  @IsString({ message: 'Must be a string (Id)' })
  readonly userId: ObjectId;
}
