import 'reflect-metadata';
import { AppDataSource } from '../db/data-source';
import { UserRequest } from '../user-request/user-request.entity';
import { User } from '../user/user.entity';
import { faker } from '@faker-js/faker';
import { Tag } from '../tag/tag.entity';

const initUserRequest = async () => {
  const userRequestRepo = AppDataSource.getRepository(UserRequest);
  const userRequsts = new Array(20)
    .fill(null)
    .map((_) => {
      return userRequestRepo.create({
        city: faker.location.city(),
        country: faker.location.country(),
        discord: '#TestDiscord',
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        linkedin: faker.internet.url(),
        phone: faker.phone.number(),
        specialization: 'Back',
      });
    })
    .flat();
  await userRequestRepo.save(userRequsts);
};

const initUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({
    email: 'admin@gmail.com',
    password: '$2a$10$.oDlu/c0ckmnUtvP1zkI8.jLajjPevitOOAdKIK8RE37gZbj.MQ6G',
    city: faker.location.city(),
    country: faker.location.country(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    linkedin: faker.internet.url(),
  });
  await userRepo.save(user);
};

const initTags = async () => {
  const tagRepo = AppDataSource.getRepository(Tag);
  const tags = new Array(10)
    .fill(null)
    .map((_) => {
      return tagRepo.create({
        color: 'red',
        name: faker.hacker.abbreviation(),
        isSpecialization: Boolean(faker.number.int({ min: 0, max: 1 })),
      });
    })
    .flat();
  await tagRepo.save(tags);
};

const main = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('PRODUCTION ENV');
  }
  await AppDataSource.initialize();
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
  await AppDataSource.initialize();
  await initUsers();
  await initUserRequest();
  await initTags();
};

main();
