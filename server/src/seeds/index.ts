import 'reflect-metadata';
import { AppDataSource } from '../db/data-source';
import { UserRequest } from '../user-request/user-request.entity';
import { User } from '../user/user.entity';
import { faker } from '@faker-js/faker';
import { Tag } from '../tag/tag.entity';
import { Project } from '../project/project.entity';
import { ProjectStatuses, ProjectTypes } from '../project/project.enums';
import { ProjectRequirment } from '../project/requirment/project-requirment.entity';

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

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
  const admin = userRepo.create({
    email: 'admin@gmail.com',
    password: '$2a$10$.oDlu/c0ckmnUtvP1zkI8.jLajjPevitOOAdKIK8RE37gZbj.MQ6G',
    city: faker.location.city(),
    country: faker.location.country(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    linkedin: faker.internet.url(),
  });
  const users = new Array(10).fill(null).map((v, i) => {
    return userRepo.create({
      email: `user${i}@gmail.com`,
      password: '$2a$10$.oDlu/c0ckmnUtvP1zkI8.jLajjPevitOOAdKIK8RE37gZbj.MQ6G',
      city: faker.location.city(),
      country: faker.location.country(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      linkedin: faker.internet.url(),
    });
  });
  await userRepo.save([admin, ...users]);
};

const initTags = async () => {
  const tagRepo = AppDataSource.getRepository(Tag);
  const tags = new Array(20)
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

const initProj = async () => {
  const set = new Set();
  const projRepo = AppDataSource.getRepository(Project);
  const projs = new Array(10).fill(null).map((_, i) => {
    let name;
    while (true) {
      name = faker.hacker.adjective();
      if (!set.has(name)) {
        set.add(name);
        break;
      }
    }
    return projRepo.create({
      description: faker.hacker.phrase(),
      name: name,
      price: 0,
      projectType: ProjectTypes.FREE,
      projectPoints: 25,
      projectStatus: ProjectStatuses.IN_SEARCH,
    });
  });
  await projRepo.save(projs);
};

const initProjReq = async () => {
  const projReq = AppDataSource.getRepository(ProjectRequirment);
  const projreqs = new Array(10).fill(null).map((_, i) => {
    return new Array(getRandomInt(4, 9)).fill(null).map((v, j) => {
      return projReq.create({
        count: getRandomInt(2, 6),
        projectId: i + 1,
        tagId: j + 1,
      });
    });
  });
  const arr = projreqs.flat();
  await projReq.save(arr);
};

const initUserTags = async () => {
  const tagRepo = AppDataSource.getRepository(Tag);
  const tags = await tagRepo.find();
  const [spec, tech] = tags.reduce(
    (acc, el) => {
      acc[el.isSpecialization ? 0 : 1].push(el);
      return acc;
    },
    [new Array(), new Array()],
  );
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find({
    relations: ['specializations', 'technologies'],
  });
  users.forEach((user) => {
    const newSpec: Set<Tag> = new Set();
    const newTech: Set<Tag> = new Set();
    while (newSpec.size < getRandomInt(1, spec.length - 2))
      newSpec.add(spec[getRandomInt(0, spec.length)]);
    while (newTech.size < getRandomInt(1, tech.length - 2))
      newTech.add(tech[getRandomInt(0, tech.length)]);
    user.technologies.push(...newTech);
    user.specializations.push(...newSpec);
  });
  await userRepo.save(users);
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
  await initProj();
  await initProjReq();
  await initUserTags();
};

main();
