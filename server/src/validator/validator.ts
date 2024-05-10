import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationOptions } from 'joi';

interface ValidationSchemas {
  body?: ObjectSchema | null;
  params?: ObjectSchema | null;
  query?: ObjectSchema | null;
}

const options: ValidationOptions = {
  stripUnknown: true,
  allowUnknown: false,
};

const validator = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = [];
    if (schemas.body) {
      const result = schemas.body.validate(req.body, options);
      if (result.error) {
        errors.push(result.error);
      } else {
        req.body = result.value;
      }
    }
    if (schemas.params) {
      const result = schemas.params.validate(req.params, options);
      if (result.error) {
        errors.push(result.error);
      } else {
        req.params = result.value;
      }
    }
    if (schemas.query) {
      const result = schemas.query.validate(req.query, options);
      if (result.error) {
        errors.push(result.error);
      } else {
        req.query = result.value;
      }
    }
    if (errors.length) {
      return res.status(400).send(errors);
    } else {
      return next();
    }
  };
};

export default validator;
