import { Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";

import { CreateWorkspaceDto } from "workspace/dtos/create-workspace.dto";

import { UserService } from "workspace/services/user.service";
import { WorkspaceMemberService } from "workspace/services/workspace-member.service";
import { WorkspaceRepository } from "workspace/repositories/workspace.repository";

import {
  User,
  Workspace,
  WorkspaceMemberRolesEnum,
} from "project-manager-entities/project-manager-db";

@Injectable()
export class WorkspaceService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    
    @Inject(WorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepository,

    @Inject(forwardRef(() => WorkspaceMemberService))
    private readonly workspaceMemberService: WorkspaceMemberService,
  ) {}

  async performWorkspaceCreation({
    userEmail,
    workspaceName
  }: CreateWorkspaceDto): Promise<string> {
    const user = await this.userService.getUserByParams({ email: userEmail });

    const createdWorkspaceId = await this.createWorkspace(workspaceName, user);

    return createdWorkspaceId;
  }

  private async createWorkspace(workspaceName: string, user: User): Promise<string> {
    const workspaceToBeCreated: Partial<Workspace> = {
      name: workspaceName,
      ownerId: user.id,
    };

    const workspace = this.workspaceRepository.createWorkspaceInstance(
      workspaceToBeCreated
    );

    await this.workspaceRepository.saveWorkspace(workspace);
    
    await this.addOwnerToWorkspace({ workspace, user });

    console.info(`Workspace created with ID: ${workspace.id}`, {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      ownerId: user.id,
    });
    
    return workspace.id;
  }

  private async addOwnerToWorkspace({
    workspace,
    user
  }: {
    workspace: Workspace,
    user: User
  }): Promise<void> {
    const workspaceMemberToBeCreated = {
      workspace,
      user,
      role: WorkspaceMemberRolesEnum.ADMIN,
    };

    await this.workspaceMemberService.createWorkspaceMember(
      workspaceMemberToBeCreated
    );

    console.info(`Owner added to workspace-members and workspace with ID: ${workspace.id}`, 
      {
        workspaceId: workspace.id,
        userId: user.id,
        role: WorkspaceMemberRolesEnum.ADMIN,
      }
    );
  }

  async getWorkspaceByParams(
    params: Partial<Workspace>
  ): Promise<Workspace> {
    const workspace = await this.workspaceRepository.getWorkspaceByParams(params);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }
}