const express = require("express");
const{getExpenses, createExpense} = require("../controllers/expenseController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/all").get(getExpenses).post(createExpense);  


module.exports = router;

