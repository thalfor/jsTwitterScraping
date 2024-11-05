//
require('dotenv/config');
const { z } = require('zod');
//
const envSchema = z.object({
  USERNAMELOGIN: z.string(),
  PASSWORD: z.string(),
  USER: z.string(),
});

const env = envSchema.safeParse(process.env).data;

//console.log(env.USERNAMELOGIN);
//console.log(env.PASSWORD);

module.exports = env;
//