export interface IProjectRequirmentDto {
  projectId: number;
  tagId: number;
  count: number;
}

export interface IProjectRequirmentDeleteDto
  extends Omit<IProjectRequirmentDto, 'count'> {}
