import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  workspaceName: string;

  @IsString()
  @IsNotEmpty()
  userEmail: string;
}
