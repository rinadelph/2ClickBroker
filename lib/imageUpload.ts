import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  await fs.writeFile(filePath, buffer);

  return `/uploads/${fileName}`;
}