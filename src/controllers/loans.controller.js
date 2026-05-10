const Book = require('../models/Book');
const Loan = require('../models/Loan');
const User = require('../models/User');

class LoansController {
    getAll = async (req, res) => {
        const loans = await Loan.find().populate("user").populate("book");    
        res.status(200).json(loans);
    }
    getOne = async (req, res) => {
        const id = req.params.id;
        const loan = await Loan.findById(id).populate("user").populate("book");    
        if(!loan) return res.status(404).json({ message: "Loan not found" });
        res.status(200).json(loan);
    }
    makeLoan = async (req, res) => {
        const { days, user: userId, book: bookId } = req.body;

        const user = await User.findById(userId)   
        if(!user) return res.status(404).json({ message: "User not found" });

        const book = await Book.findById(bookId)   
        if(!book) return res.status(404).json({ message: "Book not found" });

        if(days < 1) return res.status(400).json({ message: "Days must be at least 1" });

        const loans = await Loan.find({ user });

        if(loans.length !== 0) {
            const prevLoan = loans[loans.length - 1];
            const prevBook = await Book.findById(prevLoan.book);
            if(prevBook.isLoaned) return res.status(400).json({ message: "User has an active loan" });
        }

        const loan = await Loan.create({ days, user: userId, book: bookId });
        book.isLoaned = true;
        await book.save();

        res.status(201).json(loan);
    }
    returnBook = async (req, res) => {
        const user = req.body.user;

        const loans = await Loan.find({ user });

        if(loans.length === 0) return res.status(404).json({ message: "No loans found for this user" });

        const loan = loans[loans.length - 1];
        const book = await Book.findById(loan.book);
        if(book.isLoaned === false) return res.status(400).json({ message: "Book is not loaned" });
        book.isLoaned = false;
        await book.save();

        res.status(200).json({ message: "Book returned successfully" });
    }
}

module.exports = new LoansController();