import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExpense } from '../api/ExpenseService';
import { toastError, toastSuccess } from '../api/ToastService';

const ExpenseDetail = ({ updateExpense }) => {
    const [expense, setExpense] = useState({
        id: '',
        name: '',
        amount: '',
        price: '',
        date: ''
    });

    const { id } = useParams();

    const fetchExpense = async (id) => {
        try {
            const { data } = await getExpense(id);
            setExpense(data);
            console.log(data);
            //toastSuccess('Expense retrieved');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange = (event) => {
        setExpense({ ...expense, [event.target.name]: event.target.value });
    };

    const onUpdateExpense = async (event) => {
        event.preventDefault();
        try {
            await updateExpense(expense);        
            fetchExpense(id);
            toastSuccess('Expense Updated');
        } catch (error) {
            console.error(error);
            toastError('Failed to update expense');
        }
    };


    useEffect(() => {
        fetchExpense(id);
    }, []);

    return (
        <>
            <Link to={'/expenses'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <div className='profile__metadata'>
                        <p className='profile__name'>{expense.name}</p>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateExpense} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={expense.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={expense.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Amount</span>
                                    <input type="text" value={expense.amount} onChange={onChange} name="amount" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Price</span>
                                    <input type="text" value={expense.price} onChange={onChange} name="price" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Date</span>
                                    <input type="text" value={expense.date} onChange={onChange} name="date" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpenseDetail;