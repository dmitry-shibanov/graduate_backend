import { RequestHandler } from 'express';
import fs, { promises } from 'fs';
import Course from '../data/models/course';
import Video from '../data/models/video';

export const streamVideo: RequestHandler = async (req, res, next) => {
  let controllerDir = __dirname.replace('/dist/controller', '');
  let video = req.params.id;
  video = video.replace('undefined', '');
  const videoObj = await Video.findByPk(video);
  const path = `${controllerDir}/${videoObj?.url}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
};

export const getAllCourses: RequestHandler = async (req, res, next) => {
  const courses = await Course.findAll();

  return res.status(200).json({ courses: courses });
};

export const getCourse: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const video = await Video.findAll({ where: { course_id: id } });

    return res.status(200).json({videos: video});
};

const videoTime = async (pathVideo: string) => {
  const buff = Buffer.alloc(100);
  const header = Buffer.from('mvhd');
  const file = await promises.open('video.mp4', 'r');
  const { buffer } = await file.read(buff, 0, 100, 0);

  await file.close();

  const start = buffer.indexOf(header) + 17;
  const timeScale = buffer.readUInt32BE(start);
  const duration = buffer.readUInt32BE(start + 4);

  const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

  console.log(buffer, header, start, timeScale, duration, audioLength);
};
