export interface IProjectMemberAddDto {
  projectId: number;
  tagId: number;
  userId: number;
}

export interface IProjectMemberRemoveDto
  extends Omit<IProjectMemberAddDto, 'tagId'> {}
