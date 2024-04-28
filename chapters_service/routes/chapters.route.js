const express = require('express');
const router = express.Router();
const chapterController = require('../controller/chapters.controller');

router.post('/:book_id/chapters', chapterController.createChapter);
router.get('/:bookId/chapters', chapterController.getChaptersByBookId);
router.get('/:bookId/chapters/:chapterId', chapterController.getChapterById);
router.put('/:bookId/chapters/:chapterId', chapterController.updateChapterById);
router.delete('/:bookId/chapters/:chapterId', chapterController.deleteChapterById);


module.exports = router;
