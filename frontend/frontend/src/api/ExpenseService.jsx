import axios from "axios";

const API_URL = 'http://localhost:8080/expenses';

export async function saveExpense(expense) {
    return await axios.post(API_URL, expense)
}

export async function getExpenses(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getExpense(id) {
    return await axios.get(`${API_URL}/${id}`)
}

export async function updateExpense(expense) {
    return await axios.post(API_URL, expense)
}

export async function deleteExpense(id) {
    return await axios.delete(`${API_URL}/${id}`)
}