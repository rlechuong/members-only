import { body } from "express-validator";

const validateMessage = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title must be no longer than 100 characters."),
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Message body is required.")
    .isLength({ max: 5000 })
    .withMessage("Message body must be no longer than 5000 characters."),
];

export { validateMessage };
