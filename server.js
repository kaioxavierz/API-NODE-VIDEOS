import { fastify } from 'fastify';
import { DataBaseMemory } from './database-memory.js';
import { DataBasePostgress } from './database-postgres.js';

const server = fastify();
//const database = new DataBaseMemory();
const database = new DataBasePostgress()

server.post('/videos', async (request, response) => {
    const {title, description, duration} = request.body;
    //Short sintaxe
    await database.create({
        title,
        description,
        duration,
    })
    return response.status(200).send({
        message: 'video criado com sucesso',
        
    })
});

server.get('/videos', async (request) => {
    const search = request.query.search;
    const videos = await database.list(search);
    return videos;
});

server.put('/videos/:id', async(request, response) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;
    const video = await database.update(videoId, {
      title,
      description,
      duration
    })
    return response.status(204).send({
        message: 'Video atualizado com sucesso'
    });
});

server.delete('/videos/:id', async(request, response) => {
    const videoId = request.params.id;
    await database.delete(videoId);
    return response.status(204).send({
        message: 'Video apagado com sucesso'
    })
});

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})