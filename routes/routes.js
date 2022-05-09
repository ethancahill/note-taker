const router = require('express').Router();

const path = require('path');
const fs = require('fs');
const notes = require('../db/db.json');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  
  router.get('/api/notes', (req, res) => {
    res.json(notes)
  });
  
  router.get('/api/notes:id', (req, res) => {
    notes.forEach(note => {
        if (note.id === req.params.id) {
            res.json(notes)
        }
    })
  });
  
  router.post('/api/notes', (req, res) => {
    let id = (notes.length + 1).toString()
    const addNote = { 
      "title": req.body.title,
      "text": req.body.text,
      "id":  id
  }
    notes.push(addNote)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2))
    res.json(notes);
  });
  
  router.delete('/notes/:id', (req, res) => {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === req.params.id) {
            notes.splice(i, 1);
        }
    }
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(notes, null, 2))
    res.json(notes);
  })
  
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  module.exports = router;