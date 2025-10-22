import React, { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        💸 Expense Tracker
      </h2>

      {/* Balance Overview */}
      <div className="text-center mb-6">
        <p className="text-gray-500 dark:text-gray-400">Current Balance</p>
        <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          ${balance.toFixed(2)}
        </h3>
      </div>

      {/* Add Transaction Form */}
      <form
        onSubmit={handleAddTransaction}
        className="flex flex-col space-y-4 mb-6"
      >
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none 
                     focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span>Income</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
              className="text-blue-500 focus:ring-blue-500"
            />
            <span>Expense</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 
                     transition duration-200 shadow-md"
        >
          Add Transaction
        </button>
      </form>

      {/* Transaction List */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Recent Transactions
        </h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No transactions yet.</p>
        ) : (
          <ul className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className={`flex justify-between items-center p-3 rounded-xl border-l-4 ${
                  tx.type === "income"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                    : "border-red-500 bg-red-50 dark:bg-red-900/30"
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {tx.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tx.type === "income" ? "Income" : "Expense"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`font-semibold ${
                      tx.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    aria-label="Delete transaction"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
