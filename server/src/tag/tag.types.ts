export interface ICreateTag {
  name: string;
  color: string;
  isSpecialization: boolean;
}

export interface IUpdateTag extends Partial<ICreateTag> {}
