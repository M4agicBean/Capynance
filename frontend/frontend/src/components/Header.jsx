import React from 'react'

const Header = ({ toggleModal, numOfExpenses }) => {
  return (
    <header className="header">
      <div className="container header__wrapper">
        <h3 className="header__title">Expense List ({numOfExpenses})</h3>
        <button onClick={() => toggleModal(true)} className="btn btn--large">
          <i className="bi bi-plus-square"></i> Add New Expense
        </button>
      </div>
    </header>
  );
};


export default Header