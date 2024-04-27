
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Schema
const bookRequestSchema = new mongoose.Schema({
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  book_name: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_name: String,
  request: { type: String, enum: ['pending', 'accepted', 'declined'] },
});

const BookRequest = mongoose.model('BookRequest', bookRequestSchema);

// Route Handlers
router.post('/requests', reader, async (req, res) => {
  const status = 'pending';
  // VALIDATION REQUEST
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const book = await Book.findById(req.body.book_id);
    if (!book) {
      return res.status(404).json({ msg: "book not found !" });
    }

    const bookRequest = new BookRequest({
      book_id: book._id,
      book_name: book.name,
      user_id: req.user._id,
      user_name: req.user.name,
      request: status,
    });

    await bookRequest.save();
    return res.status(200).send('Book request created successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error creating book request');
  }
});

router.get('/requests/pending', admin, async (req, res) => {
  try {
    const pendingRequests = await BookRequest.find({ request: 'pending' });
    return res.status(200).json(pendingRequests);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error retrieving book requests');
  }
});

// Similarly, you need to modify other routes to work with MongoDB
