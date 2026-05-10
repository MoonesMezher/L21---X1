const Book = require('../models/Book');
const Loan = require('../models/Loan');

class BooksController {
    getAll = async (req, res) => {
        const books = await Book.find();    
        res.status(200).json(books);
    }
    getOne = async (req, res) => {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        const loans = await Loan.find({ book: id })
            .populate("user")
            .sort({ createdAt: -1 })
            .lean();
        const payload = book.toObject();
        payload.loans = loans;
        res.status(200).json(payload);
    }
    add = async (req, res) => {
        const { title, author, price } = req.body;
        const book = await Book.create({ title, author, price });
        res.status(201).json(book);
    }
    update = async (req, res) => {
        const id = req.params.id;
        const book = await Book.findById(id);    
        if(!book) return res.status(404).json({ message: "Book not found" });

        const { title, author, price } = req.body;
        book.title = title || book.title;
        book.author = author || book.author;
        book.price = price || book.price;
        await book.save();

        res.status(200).json(book);
    }
    remove = async (req, res) => {
        const id = req.params.id;
        const book = await Book.findById(id);    
        if(!book) return res.status(404).json({ message: "Book not found" });

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully" });
    }
}

module.exports = new BooksController();