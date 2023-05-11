import { useState } from "react";
import { useGlobalState } from "../../context/GlobalState";

export function TransactionForm() {
  const { addTransaction } = useGlobalState();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: window.crypto.randomUUID(),
      description,
      amount: transactionType === "income" ? +amount : -amount,
    };

    addTransaction(newTransaction);

    setDescription("");
    setAmount(0);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div className="flex items-center justify-between mb-2">
          <label className="mr-2">
            <input
              type="radio"
              name="transactionType"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            Expense
          </label>
          <label>
            <input
              type="radio"
              name="transactionType"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            Income
          </label>
        </div>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          placeholder="0.00"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        
        <button
          className="bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full disabled:opacity-50"
          disabled={!description || !amount}
        >Add Transaction</button>
      </form>
    </div>
  );
}
