import express, { Request, Response } from 'express';
import multer from 'multer';
import db from '../db';
import * as Filepond from 'filepond';
import filepondPluginFileEncode from 'filepond-plugin-file-encode';
import filepondPluginImagePreview from 'filepond-plugin-image-preview';

const filepond = Filepond();
filepond.setOptions({
  allowMultiple: false,
  allowRevert: false,
  server: {
    process: '/api/upload',
  },
});
filepond.registerPlugin(filepondPluginFileEncode);
filepond.registerPlugin(filepondPluginImagePreview);

app.post('/api/upload', upload.single('filepond'), async (req: Request, res: Response) => {
    try {
      const prisma = new PrismaClient();
      const { filename, path } = req.file;
  
      // Save the file to the database
      const savedFile = await prisma.file.create({
        data: {
          name: filename,
          path,
        },
      });
  
      res.status(200).json({ id: savedFile.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  