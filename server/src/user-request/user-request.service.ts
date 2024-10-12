import { IsNull, LessThan, Not } from 'typeorm';
import { AppDataSource } from '../db/data-source';
import { UserRequest } from './user-request.entity';
import { ICreateUserRequest } from './user-request.types';
import { findByEmail } from '../user/user.service';
import { sendRegisterEmail } from '../mail/mail.service';

const userRequestRepository = AppDataSource.getRepository(UserRequest);

export const createUserRequest = async (
  createUserRequestDto: ICreateUserRequest,
) => {
  const request = await userRequestRepository.findOne({
    where: {
      email: createUserRequestDto.email,
    },
  });
  if (request) throw new Error('Request already exist');
  try {
    const user = await findByEmail(createUserRequestDto.email);
    if (user) throw new Error('User already exist');
  } catch (error: any) {
    if (error.message === 'User already exist') {
      throw error;
    }
  }
  const newRequest = userRequestRepository.create({
    ...createUserRequestDto,
    created_at: new Date(),
  });
  const result = await userRequestRepository.save(newRequest);
};

export const resolveUserRequest = async (id: number, accepted: boolean) => {
  const request = await userRequestRepository.findOne({ where: { id } });
  if (request === null) {
    throw new Error('User request not found');
  }
  if (request.isAccepted !== null) {
    throw new Error('Request already resolved');
  }
  request.isAccepted = accepted;
  await userRequestRepository.save(request);
  if (accepted) await sendRegisterEmail(request.email);
};

export const getAll = async (skip: number, active = true) => {
  const requests = await userRequestRepository.find({
    where: { isAccepted: active ? Not(IsNull()) : IsNull() },
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
  const request = await userRequestRepository.findOne({
    where: { email },
  });
  if (request === null) {
    throw new Error('User request not found');
  }
  return request;
};

export const resendInvite = async (email: string) => {
  const request = await getByEmail(email);
  if (request.isAccepted) await sendRegisterEmail(request.email);
};
