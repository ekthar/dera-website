#!/usr/bin/env node
/**
 * Builds src/app/favicon.ico from src/app/icon.svg.
 * The ICO embeds 16, 32 and 48 px PNG images, which every modern browser reads.
 * Run with: npm run brand:favicon
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svg = await readFile(path.join(root, "src/app/icon.svg"));
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

const entries = [];
let offset = 6 + images.length * 16;
images.forEach((image, index) => {
  const entry = Buffer.alloc(16);
  const size = sizes[index];
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  entries.push(entry);
});

const ico = Buffer.concat([header, ...entries, ...images]);
await writeFile(path.join(root, "src/app/favicon.ico"), ico);
console.log(`favicon.ico written (${ico.length} bytes, sizes ${sizes.join(", ")})`);
