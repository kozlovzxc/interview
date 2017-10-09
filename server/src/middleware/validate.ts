import * as Joi from 'joi';
import * as express from 'express';

function validate(schemas: {
  query?: Joi.Schema,
  body?: Joi.Schema,
  params?: Joi.Schema,
  [key: string]: Joi.Schema | undefined,
}) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    for (const [reqPart, schemaPart] of [
      [req.query, schemas.query],
      [req.body, schemas.body],
      [req.params, schemas.params],
    ] ) {
      if ( schemaPart !== undefined) {
        const validationResult: Joi.ValidationResult<any> = Joi.validate(reqPart, schemaPart);
        if (validationResult.error !== null) {
          next(new Error(validationResult.error.message));
        }
      }
    }
    next();
  };
}

export default validate;
