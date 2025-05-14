import React from 'react';
import Expense from "./Expense"

const ExpenseList = ({ data, currentPage, getAllExpenses }) => {
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Expenses. Please add a new Expense</div>}

            <ul className='expense__list'>
                {data?.content?.length > 0 && data.content.map(expense => <Expense expense={expense} key={expense.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getAllExpenses(currentPage - 1)} className={currentPage === 0 ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page, index) => 
                    <a onClick={() => getAllExpenses(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getAllExpenses(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }

        </main>
    )
}

export default ExpenseList