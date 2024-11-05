//
require('dotenv/config');
const { z } = require('zod');
//
const envSchema = z.object({
  USERNAME: z.string(),
  PASSWORD: z.string(),
});

const env = envSchema.safeParse(process.env).data;

module.exports = env;
//