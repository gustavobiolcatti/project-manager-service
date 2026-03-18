import { Inject, Injectable } from "@nestjs/common";

import { WorkspaceMemberRepository } from "workspace/repositories/workspace-member.repository";

import { 
  User,
  Workspace,
  WorkspaceMember,
  WorkspaceMemberRolesEnum,
} from "project-manager-entities/project-manager-db";

@Injectable()
export class WorkspaceMemberService {
  constructor(
    @Inject(WorkspaceMemberRepository)
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
  ) {}

  async createWorkspaceMember({
    workspace,
    user,
    role
  }: {
    workspace: Workspace,
    user: User,
    role: WorkspaceMemberRolesEnum
  }): Promise<string> {
    const workspaceToBeCreated: Partial<WorkspaceMember> = {
      workspace,
      user,
      role,
    };

    const workspaceMember = this.workspaceMemberRepository.createWorkspaceMemberInstance(
      workspaceToBeCreated
    );

    return await this.workspaceMemberRepository.saveWorkspaceMember(workspaceMember);
  }
}