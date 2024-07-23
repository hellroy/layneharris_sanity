// server/api/stickers.ts
import { defineEventHandler } from 'h3';
import { client } from '../../utils/sanity-client';

export default defineEventHandler(async () => {
  const query = `*[_type == "sticker"] | order(name desc){_id, name, description, "sticker": sticker.asset->url}`;
  const stickers = await client.fetch(query);
  return stickers;
});
