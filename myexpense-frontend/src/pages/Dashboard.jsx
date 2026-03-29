import { useState, useEffect } from "react";
import { getExpenses, createExpense } from "../api";

function Dashboard({ token, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getExpenses(token);
      setExpenses(Array.isArray(data) ? data : data.expenses || []);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!item || !amount) {
      setFormError("Item and amount are required");
      return;
    }
    setAdding(true);
    try {
      const data = await createExpense(token, { item, amount: Number(amount) });
      setExpenses((prev) => [data.e, ...prev]);
      setItem("");
      setAmount("");
    } catch (err) {
      setFormError("Failed to add expense");
    } finally {
      setAdding(false);
    }
  };

const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>💸 My Expenses</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {/* Total */}
      <div className="total-card">
        <p>Total Spent</p>
        <h2>₹{total.toFixed(2)}</h2>
      </div>

      {/* Add Expense Form */}
      <div className="form-card">
        <h3>Add Expense</h3>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Item (e.g. Lunch)"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {formError && <p className="error">{formError}</p>}
          <button type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>

      {/* Expense List */}
      <div className="expense-list">
        <h3>All Expenses</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && expenses.length === 0 && <p>No expenses yet. Add one above!</p>}
        {expenses.map((expense, index) => (
          <div className="expense-item" key={expense._id || index}>
            <div>
              <p className="expense-title">{expense.item}</p>
            </div>
            <p className="expense-amount">₹{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
