const Chapter = require('../models/chapters.model');

const chapterController = {

    createChapter: async (req, res) => {
        try {
            const { title, description } = req.body;
            const chapter = new Chapter({
                title,
                description,
                book_id: req.params.book_id
            });
            await chapter.save();
            res.status(200).json({ success: true, chapter:chapter });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        }
    },
    getChaptersByBookId: async (req, res) => {
        try {
            const bookId = req.params.bookId;
            const chapters = await Chapter.find({ book_id: bookId })
            res.status(200).json(chapters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving chapters' });
        }
    },
    getChapterById: async (req, res) => {
        try {
            const chapterId = req.params.chapterId;
            const chapter = await Chapter.findById(chapterId);
            if (!chapter) {
                return res.status(404).json({ msg: "Chapter not found!" });
            }
            res.status(200).json(chapter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving chapter' });
        }
    },
    updateChapterById: async (req, res) => {
        try {
            const { title, description } = req.body;
            const bookId = req.params.bookId;
            const chapterId = req.params.chapterId;
            
            const updatedChapter = await Chapter.findOneAndUpdate(
                { _id: chapterId, book_id: bookId },
                { title, description },
                { new: true }
            );

            if (!updatedChapter) {
                return res.status(404).send('Chapter not found for the given book');
            }

            res.status(200).send({chapter : updatedChapter});
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating chapter');
        }
    },
    deleteChapterById: async (req, res) => {
        try {
            const bookId = req.params.bookId;
            const chapterId = req.params.chapterId;

            const deletedChapter = await Chapter.findOneAndDelete({ _id: chapterId, book_id: bookId });

            if (!deletedChapter) {
                return res.status(404).send('Chapter not found for the given book');
            }

            res.status(200).send('Chapter deleted successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting chapter');
        }
    }
    
};

module.exports = chapterController;
