import * as Joi from 'joi';

export default Joi.object({
    NODE_ENV:Joi.string()
                .valid('development','test','production')
                .default('devlopment'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(3306),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    JWT_TOKEN_SECRET:Joi.string().required()
    // DB_SYNC: Joi.string().valid('true', 'false').default('false'),
    // AUTO_LOAD: Joi.string().valid('true', 'false').default('false'),
})
