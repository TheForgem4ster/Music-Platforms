import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: "Admin", description: "Role unique value"})
    readonly value: string;

    @ApiProperty({example: "administrator", description: "Role description"})
    readonly description: string;
}