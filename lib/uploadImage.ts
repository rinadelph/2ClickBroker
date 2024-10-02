import fs from 'fs/promises';
import path from 'path';

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });

  // Generate a unique filename
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);

  // Write the file
  await fs.writeFile(filepath, buffer);

  // Return the public URL
  return `/uploads/${filename}`;
}