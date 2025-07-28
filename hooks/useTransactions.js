import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export function useTransactions(userId) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch transactions summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransactions, fetchSummary]);

  const deleteTransaction = async (id) => {
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");

      await loadData();

      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Failed to delete transactions:", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, isLoading, summary, loadData, deleteTransaction };
}
