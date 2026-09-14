const { z } = require('zod');

const postSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1),
  body: z.string().min(1)
});

module.exports = { postSchema };
