import { useEffect,useState } from 'react';
import {useNavigate} from "react-router-dom"
import {toast , ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ExpenseReport = () => {

const userId = localStorage.getItem('userId');
    const navigate = useNavigate()

    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [expenses,setExpenses] = useState([])
    const [grandTotal,setGrandTotal] = useState(0)

    useEffect(() => {
        if(!userId){
            navigate('/login');
        }
    },[userId,navigate])

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`)


             if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
        const data = await response.json()
        
        setExpenses(data.expenses)
        setGrandTotal(data.total)

        } catch (error) {
            console.error('Error fetching expenses: ',error);
            toast.error('Something went wrong. Try again.')
        }
    }

  return (
    <div className='container mt-5'>
           <div className='text-center mb-5'> 
           <h2> <i className='fas fa-file-invoice-dollar me-2'></i> Datewise Expense Report</h2>
            <p className='text-muted'>Search and analyze your expenses between two dates</p>
           </div>
    
           <form className='row g-3 mb-5' onSubmit={handleSubmit}>
    
            <div className='col-md-4'>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-calendar-alt'></i>
                    </span>
                   < input type='date' placeholder='Enter the from date' onChange={(e) => setFromDate(e.target.value)} value={fromDate} required name='fromDate' className='form-control'/>
                </div>
            </div>

            <div className='col-md-4'>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-calendar-alt'></i>
                    </span>
                   < input type='date' placeholder='Enter the to date' onChange={(e) => setToDate(e.target.value)} value={toDate} required name='toDate' className='form-control'/>
                </div>
            </div>
    
    <div className='col-md-4'>
            <button type='submit' className='btn btn-primary w-100'><i className='fas fa-search me-2'></i>Search</button>
    </div>
           </form>

           <div>

            <table className='table table-striped table-bordered'>
                <thead className='table-dark text-center'>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Cost</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {expenses.length > 0 ? (
                        expenses.map((exp,index) => (
                            <tr key={exp.id}> 
                            {/* use for better performance for not rendering the page again only update the row  */}
                        <td>{index + 1}</td>
                        <td>{exp.ExpenseDate}</td>
                        <td>{exp.ExpenseItem}</td>
                        <td>{exp.ExpenseCost}</td>
                    </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={5} className='text-center text-muted'><i className='fas fa-exclamation-circle me-2'></i>No expenses found</td>
                    </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className='text-end fw-bold'>GrandTotal: </td>
                        <td className='text-success fw-bold'>₹ {grandTotal}</td>
                    </tr>
                </tfoot>
            </table>

           </div>
    
           <ToastContainer />
        </div>
      
  )
}

export default ExpenseReport
