import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkspaceController } from "workspace/controllers/workspace.controller";
import { WorkspaceService } from "workspace/services/workspace.service";
import { WorkspaceMemberService } from "workspace/services/workspace-member.service";
import { UserService } from "workspace/services/user.service";
import { WorkspaceRepository } from "workspace/repositories/workspace.repository";
import { WorkspaceMemberRepository } from "workspace/repositories/workspace-member.repository";
import { UserRepository } from "workspace/repositories/user.repository";

import { User, Workspace, WorkspaceMember } from "project-manager-entities/project-manager-db";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workspace,
      WorkspaceMember,
      User,
    ], process.env.DB_NAME)
  ],
  controllers: [WorkspaceController],
  providers: [
    WorkspaceService,
    WorkspaceMemberService,
    UserService,

    WorkspaceRepository,
    WorkspaceMemberRepository,
    UserRepository,
  ],
  exports: [
    WorkspaceService,
    WorkspaceMemberService,
    UserService,
  ],
})
export class WorkspaceModule {}