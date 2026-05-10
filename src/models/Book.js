const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    isLoaned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;