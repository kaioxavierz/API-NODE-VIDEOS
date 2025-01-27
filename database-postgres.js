import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

export class DataBasePostgress{
   async list(search = ''){
     let videos 
     if(search){
        videos = await sql`select * from videos where title ilike ${'%' + search +'%'}`
     }
     videos = await sql`select * from videos`;
     return videos;
   }

   async create(video){
    const {title, description, duration} = video;
    const videoID = randomUUID();
    await sql`
    INSERT INTO videos (id, title, description, duration) 
    VALUES (${videoID}, ${title}, ${description}, ${duration})
    `;
   }
   async update(id, video){
    const {title, description, duration} = video;
    await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
   }
   async delete(id){
    await sql`DELETE FROM VIDEOS WHERE id = ${id}`
   }
}