const { body } = require("express-validator");

const createBookValidation = [
    body("title")
        /* .if(body("title").exists({  })) */
        .isString().withMessage("Title must be string")
        .isLength({ max: 20, min: 5 }).withMessage("Length of title is invalid"),

    body("price")
        .isNumeric().withMessage("Price must be number")
        .custom((value) => {
            if(value > 1000) {
                throw new Error("Price must be lower than 1000")
            }

            return true;
        }),

    body("author")
        .isString().withMessage("Author must be string")
];

module.exports = {
    createBookValidation
}