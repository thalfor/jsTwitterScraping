//
require('dotenv/config');
const { z } = require('zod');
//
const envSchema = z.object({
  USERNAMELOGIN: z.string(),
  PASSWORD: z.string(),
  USERNAME: z.string(),
});

const env = envSchema.safeParse(process.env).data;

//console.log(env.USERNAMELOGIN);
//console.log(env.PASSWORD);
//console.log(env.USER);

module.exports = env;
//