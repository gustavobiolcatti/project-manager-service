import { Body, Controller, Headers, HttpStatus, Inject, Post } from "@nestjs/common";

import { WorkspaceService } from "workspace/services/workspace.service";
import { CreateWorkspaceDto } from "workspace/dtos/create-workspace.dto";
import { Transactional } from "typeorm-transactional";
import { DefaultReturnDto } from "shared/dtos/default-return.dto";

@Controller('workspaces')
export class WorkspaceController {
  constructor(
    @Inject(WorkspaceService)
    private readonly workspaceService: WorkspaceService,
  ) {}

  @Post('create')
  @Transactional({ connectionName: process.env.DB_NAME })
  async createWorkspace(
    @Headers() _header: Record<string, string>,
    @Body() createWorkspaceDto: CreateWorkspaceDto
  ): Promise<DefaultReturnDto> {
    const createdWorkspaceId = await this.workspaceService.performWorkspaceCreation(createWorkspaceDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Workspace created successfully',
      data: {
        workspaceId: createdWorkspaceId
      }
    };
  }
}