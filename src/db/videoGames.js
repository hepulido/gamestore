const client = require('./client');
const util = require('util');


// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
        SELECT * FROM videoGames;
    `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        const { title, genre, release_year } = body;
        const { rows: [newVideoGame] } = await client.query(`
            INSERT INTO videoGames (title, genre, release_year)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [title, genre, release_year]);
        return newVideoGame;
    } catch (error) {
        throw new Error("Error creating new video game.");
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    try {
        const { title, genre, release_year } = fields;
        const { rows: [updatedVideoGame] } = await client.query(`
            UPDATE videoGames
            SET title = $1, genre = $2, release_year = $3
            WHERE id = $4
            RETURNING *;
        `, [title, genre, release_year, id]);
        return updatedVideoGame;
    } catch (error) {
        throw new Error(`Error updating video game with ID ${id}.`);
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [deletedVideoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);
        return deletedVideoGame;
    } catch (error) {
        throw new Error(`Error deleting video game with ID ${id}.`);
    }
}


module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}