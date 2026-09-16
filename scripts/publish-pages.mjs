import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const builtIndex = join(root, 'dist', 'index.source.html');
const builtAssets = join(root, 'dist', 'assets');
const publishedAssets = join(root, 'assets');

await stat(builtIndex);
await stat(builtAssets);
await rm(publishedAssets, { recursive: true, force: true });
await mkdir(publishedAssets, { recursive: true });
await cp(builtAssets, publishedAssets, { recursive: true });
const html = (await readFile(builtIndex, 'utf8')).replace(/\r\n/g, '\n');
await writeFile(join(root, 'index.html'), html);
