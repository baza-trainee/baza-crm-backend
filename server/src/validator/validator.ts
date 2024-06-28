import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError, ValidationOptions } from 'joi';

interface ValidationSchemas {
  body?: ObjectSchema | ObjectSchema[] | null;
  params?: ObjectSchema | ObjectSchema[] | null;
  query?: ObjectSchema | ObjectSchema[] | null;
}

const options: ValidationOptions = {
  stripUnknown: true,
  allowUnknown: false,
};

const validator = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError[] = [];
    if (schemas.body) {
      const schemasArr = Array.isArray(schemas.body)
        ? schemas.body
        : [schemas.body];
      let data: any = {};
      schemasArr.forEach((schema) => {
        const result = schema.validate(req.body, options);
        result.error
          ? errors.push(result.error)
          : (data = { ...result.value, ...data });
      });
      req.body = data;
    }
    if (schemas.query) {
      const schemasArr = Array.isArray(schemas.query)
        ? schemas.query
        : [schemas.query];
      let data: any = {};
      schemasArr.forEach((schema) => {
        const result = schema.validate(req.query, options);
        result.error
          ? errors.push(result.error)
          : (data = { ...result.value, ...data });
      });
      req.query = data;
    }
    if (schemas.params) {
      const schemasArr = Array.isArray(schemas.params)
        ? schemas.params
        : [schemas.params];
      let data: any = {};
      schemasArr.forEach((schema) => {
        const result = schema.validate(req.params, options);
        result.error
          ? errors.push(result.error)
          : (data = { ...result.value, ...data });
      });
      req.params = data;
    }
    if (errors.length) {
      return res.status(400).send(errors);
    } else {
      return next();
    }
  };
};

export default validator;
