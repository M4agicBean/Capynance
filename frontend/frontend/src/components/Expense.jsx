import React from 'react'
import { Link } from 'react-router-dom'

const Expense = ({ expense }) => {
    return (
        <Link to={`/expenses/${expense.id}`} className='expense__item'>
            <div className='expense__header'>
                <p className='expense__name'>{expense.name.substring(0, 15)}</p>
            </div>
            <div className='expense__body'>
                <div className='expense__grid'>
                    <div className='expense__labels'>
                        <p>Amount:</p>
                        <p>Price:</p>
                        <p>Date:</p>
                    </div>
                    <div className='expense__values'>
                        <p>{expense.amount}</p>
                        <p>{expense.price}</p>
                        <p>{expense.date}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Expense