import { IsNull, Not } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { UserRequest } from './user-request.entity';
import { ICreateUserRequest } from './user-request.types';

const userRequestRepository = AppDataSource.getRepository(UserRequest);

export const checkEmail = async(email:string)=>{
  const result = await userRequestRepository.findOne({where:{email}})
  return result !== null
}

export const createUserRequest = async (
  createUserRequestDto: ICreateUserRequest,
) => {
  const newRequest = userRequestRepository.create(createUserRequestDto);
  const result = await userRequestRepository.save(newRequest);
};

export const resolveUserRequest = async (id: number, accepted: boolean) => {
  const request = await userRequestRepository.findOne({ where: { id } });
  if (request === null) {
    throw new Error('User request not found');
  }
  if (request.isAccepted) {
    throw new Error('Request already resolved');
  }
  request.isAccepted = accepted;
  await userRequestRepository.save(request);
};

export const getAll = async (skip: number, active = true) => {
  const requests = await userRequestRepository.find({
    select: { id: true, email: true, isAccepted: true },
    where: { isAccepted: active ? IsNull() : Not(IsNull()) },
    take: 25,
    skip,
  });
  return requests;
};

export const getById = async (requestId: number) => {
  const request = await userRequestRepository.findOne({
    where: { id: requestId },
  });
  return request;
};

export const getByEmail = async (email: string) => {
  const request = await userRequestRepository.findOne({ where: { email } });
  if (request === null) {
    throw new Error('User request not found');
  }
  return request;
};
