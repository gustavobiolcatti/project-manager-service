import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Workspace } from "project-manager-entities/project-manager-db";

@Injectable()
export class WorkspaceRepository {
  private readonly DEFAULT_LOG_OBJECT = {
    className: WorkspaceRepository.name,
    dbName: process.env.DB_NAME,
  };

  constructor(
    @InjectRepository(Workspace, process.env.DB_NAME)
    private readonly workspaceRepository: Repository<Workspace>,
  ) {}

  createWorkspaceInstance(workspace: Partial<Workspace>): Workspace {
    return this.workspaceRepository.create(workspace);
  }
  
  async saveWorkspace(workspace: Workspace): Promise<string> {
    try {
      const savedWorkspace = await this.workspaceRepository.save(workspace);

      return savedWorkspace.id;
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.saveWorkspace.name,
        error,
      })

      throw error;
    }
  }

  async getWorkspaceByParams(params: Partial<Workspace>): Promise<Workspace | null> {
    try {
      return this.workspaceRepository.findOneBy(params);
    } catch (error) {
      console.error({
        ...this.DEFAULT_LOG_OBJECT,
        function: this.getWorkspaceByParams.name,
        error,
      })

      throw error;
    }
  }
}