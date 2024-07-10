import axios from "axios";
export const fetchTransactionFromQuery=(query)=>axios.get(`/api/transaction/products?${query}`)