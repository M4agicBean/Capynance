import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import ExpenseList from './components/ExpenseList'
import { getExpenses, saveExpense } from './api/ExpenseService';
import { Routes, Route, Navigate } from 'react-router-dom';
import ExpenseDetail from './components/ExpenseDetail';
import { toastError } from './api/ToastService';
import { ToastContainer } from 'react-toastify';

function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({
    name: '',
    amount: '',
    price: '',
    date: '',
  });

  const getAllExpenses = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getExpenses(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewExpense = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveExpense(values);
      const formData = new FormData();
      formData.append('id', data.id);
      toggleModal(false);
      setValues({
        name: '',
        amount: '1',
        price: '',
        date: '',
      })
      getAllExpenses();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateExpense = async (expense) => {
    try {
      const { data } = await saveExpense(expense);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <>
      <Header toggleModal={toggleModal} numOfExpenses={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/expenses'} />} />
            <Route path="/expenses" element={<ExpenseList data={data} currentPage={currentPage} getAllExpenses={getAllExpenses} />} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Expense</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewExpense}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Amount</span>
                <input type="text" value={values.amount} onChange={onChange} name='amount' required />
              </div>
              <div className="input-box">
                <span className="details">Price</span>
                <input type="text" value={values.price} onChange={onChange} name='price' required />
              </div>
              <div className="input-box">
                <span className="details">Date</span>
                <input type="text" value={values.date} onChange={onChange} name='date' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;