import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

const officialAssetPath = path.join(process.cwd(), 'public', 'images', 'forbodyshop', 'forbodyshop-oficial.svg');

export async function GET() {
  const svgContent = await readFile(officialAssetPath, 'utf-8');
  const match = svgContent.match(/href="data:image\/(png|jpeg|jpg);base64,([^\"]+)"/);

  if (!match) {
    return new Response('ForbodyShop image not found', { status: 404 });
  }

  const extension = match[1] === 'jpg' ? 'jpeg' : match[1];
  const imageBuffer = Buffer.from(match[2].replace(/\s/g, ''), 'base64');

  return new Response(imageBuffer, {
    headers: {
      'Content-Type': `image/${extension}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
