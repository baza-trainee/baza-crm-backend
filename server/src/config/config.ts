import Joi from 'joi';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

interface IConfig {
  NODE_ENV: string;
  JWT_SECRET: string;
  SALT: string;
  SMTP_PASSWORD: string;
  SMTP_USER: string;
  BASE_URL: string;
  SMTP_SECURE: boolean;
  SMTP_PORT: number;
  SMTP_HOST: string;
  SMTP_FROM: string;
  DISCORD_BOT_TOKEN: string;
  GUILD_DISCORD_ID: string;
  PORT: number;
}

const envSchema = Joi.object<IConfig>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  BASE_URL: Joi.string().uri().required(),
  DISCORD_BOT_TOKEN: Joi.string().required(),
  GUILD_DISCORD_ID: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  SALT: Joi.number().required(),
  SMTP_SECURE: Joi.boolean().required(),
  SMTP_FROM: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_USER: Joi.string().required(),
  PORT: Joi.number().required().default(5000),
});

let environment: IConfig;

const setupConfig = () => {
  console.log('aboba');
  const { error, value } = envSchema.validate(process.env, {
    stripUnknown: true,
    allowUnknown: false,
  });
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  environment = value;
};

setupConfig();

export function getConfigValue<Key extends keyof IConfig>(
  key: Key,
): IConfig[Key] {
  return environment[key];
}

export default getConfigValue;
