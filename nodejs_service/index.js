const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require('./db')
const Books = require('./books')
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
connectDB();
const apiPort = 6002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const path = require("path")

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const diskStorage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname
      cb(null, fileName)
    },

  }
)
const fileFilter = (req, file, cb) => {
  const pdfType = file.mimetype.split("/")[1];
  const imageTypes = ['jpeg', 'jpg', 'png', 'gif'];
  if (pdfType === 'pdf' || imageTypes.includes(file.mimetype.split("/")[1])) {
    return cb(null, true);
  }
  else
    return cb(new Error('File must be either PDF or image (jpeg, jpg, png, gif)'));
}


const upload = multer({ storage: diskStorage, fileFilter })



app.post("/", upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, author, field, publicationDate, } = req.body;
    /*  if (!req.file) {
       return res.json('file is required')
     } */

    if (!req.files["image"]) {
      return res.json('Image file is required');
    }
    if (!req.files["pdfFile"]) {
      return res.json('PDF file is required');
    }
    const pdfFile = req.files['pdfFile'][0].originalname;
    const imageUrl = req.files['image'][0].originalname;
    const existingBook = await Books.findOne({ name });
    if (existingBook) {
      return res.status(400).json({ error: 'A book with the same name already exists' });
    }
    const book = new Books({ name, description, author, field, publicationDate, pdfFile, imageUrl });
    await book.save()
    return res.json({ success: true, value: book });
  } catch (err) {
    return res.json({ error: err.message })
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Books.find();
    return res.json({ success: true, value: books });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json({ success: true, value: book });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
app.put("/books/:id", upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, author, field, publicationDate } = req.body;
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (author) updatedFields.author = author;
    if (field) updatedFields.field = field;
    if (publicationDate) updatedFields.publicationDate = publicationDate;
    if (req.files["image"]) updatedFields.image = req.files['image'][0].originalname;
    if (req.files["pdfFile"]) updatedFields.pdfFile = req.files['pdfFile'][0].originalname;


    const existingBookWithName = await Books.findOne({ name: updatedFields.name });
    if (existingBookWithName && existingBookWithName._id != req.params.id) {
      return res.status(400).json({ error: 'A book with this name already exists' });
    }

    const existingBookWithPDF = await Books.findOne({ pdfFile: updatedFields.pdfFile });
    if (existingBookWithPDF && existingBookWithPDF._id != req.params.id) {
      return res.status(400).json({ error: 'A book with this PDF file already exists' });
    }
    const existingBookWithimage = await Books.findOne({ imageUrl: updatedFields.image });
    if (existingBookWithimage && existingBookWithimage._id != req.params.id) {
      return res.status(400).json({ error: 'A book with this image  already exists' });
    }

    const book = await Books.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.remove();
    return res.json({ success: true, value: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});






app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
