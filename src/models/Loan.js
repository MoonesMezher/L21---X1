const { default: mongoose } = require("mongoose");

const loanSchema = new mongoose.Schema({
    days: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;