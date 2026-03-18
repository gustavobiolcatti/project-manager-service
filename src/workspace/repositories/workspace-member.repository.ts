import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { WorkspaceMember } from "project-manager-entities/project-manager-db";

@Injectable()
export class WorkspaceMemberRepository {
  private readonly DEFAULT_LOG_OBJECT = {
    className: WorkspaceMemberRepository.name,
    dbName: process.env.DB_NAME,
  };

  constructor(
    @InjectRepository(WorkspaceMember, process.env.DB_NAME)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
  ) {}

  createWorkspaceMemberInstance(
    workspaceMember: Partial<WorkspaceMember>
  ): WorkspaceMember {
    return this.workspaceMemberRepository.create(workspaceMember);
  }
  
  async saveWorkspaceMember(workspaceMember: WorkspaceMember): Promise<string> {
    try {
      const savedWorkspaceMember = await this.workspaceMemberRepository.save(workspaceMember);

      return savedWorkspaceMember.id;
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.saveWorkspaceMember.name,
        error,
      })

      throw error;
    }
  }
}