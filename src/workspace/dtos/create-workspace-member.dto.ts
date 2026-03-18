import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { WorkspaceMemberRolesEnum } from "project-manager-entities/project-manager-db";

export class CreateWorkspaceMemberDto {
  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(WorkspaceMemberRolesEnum)
  @IsNotEmpty()
  role: WorkspaceMemberRolesEnum;
}
