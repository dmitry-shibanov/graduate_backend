import fs from "fs";
import path from "path";
import Course from '../data/models/course';
import Video from "../data/models/video";

async function getVideos(items: string[]){
    const course = await Course.create({title: "flutter camera", description: 'flutter course to work with camera'});
    const id = course.get('id')

    for(let i = 0; i<17; i++){
        let urlPath = path.join("assets/video/flutter/Camera31", items[i]);
        await Video.create({url: urlPath, subtitle: "camera", position: i, course_id: id})
    }
}

let pathDir = path.join(__dirname.replace("/dist/controller",""), "assets/video/flutter/Camera31");
console.log(pathDir);
let files = fs.readdirSync(pathDir);
console.log(files.length);
getVideos(files);