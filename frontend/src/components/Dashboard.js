import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {Pie} from "react-chartjs-2";
import {Chart,ArcElement ,Tooltip,Legend} from "chart.js"

Chart.register(ArcElement ,Tooltip,Legend);

const Dashboard = () => {
  
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    const [expenses,setExpenses] = useState([])
    const[todayTotal,setTodayTotal] = useState(0);
    const[yesterdayTotal,setYesterdayTotal] = useState(0);
    const[last7DaysTotal,setLast7DaysTotal] = useState(0);
    const[last30DaysTotal,setLast30DaysTotal] = useState(0);
    const[yearTotal,setYearTotal] = useState(0);
    const [grandTotal,setGrandTotal] = useState(0);


      const pieData = {
        labels: expenses.map(item => item.ExpenseItem),
        datasets: [
          {
              label: 'Expense Cost',
              data: expenses.map(item => parseFloat(item.ExpenseCost)),
              backgroundColor: [
                'red',
                'blue',
                'pink',
                'orange',
                'brown',
                'green',
                'yellow',
                'purple',
                'rgba(80,10,45,0.5)',
              ],
              borderWidth: 1,
          }
        ]
      }


     useEffect(() => {
            if(!userId){
                navigate('/login');
            }
            fetchExpenses(userId)
        },[userId,navigate])

         const fetchExpenses = async(userId) => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`)
            const data =  await response.json();
            setExpenses(data);
            calculateTotals(data);
            }
           catch(error){
                console.error('Error fetching expenses ',error)
           }
        }

        const calculateTotals = (data) => {
            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(today.getDate() - 1);

            const last7Days = new Date()
            last7Days.setDate(today.getDate() - 7);

            const last30Days = new Date()
            last30Days.setDate(today.getDate() - 30)

            const currentYear = today.getFullYear()


            let todaySum = 0 , yesterdaySum = 0 , last7DaysSum = 0 , last30DaysSum = 0 ,yearSum = 0 , grandSum = 0;

            data.forEach(item => {
              const expenseDate = new Date(item.ExpenseDate);
              let amount = parseFloat(item.ExpenseCost) || 0;

              if (expenseDate.toDateString() == today.toDateString()) {
                  todaySum += amount;
              }
              
              if (expenseDate.toDateString() === yesterday.toDateString()) {
                  yesterdaySum += amount;
              }
              if (expenseDate >= last7Days) {
                  last7DaysSum += amount;
              }
              if (expenseDate >=  last30Days) {
                  last30DaysSum += amount;
              }
              if (expenseDate.getFullYear() === currentYear) {
                yearSum += amount;
              }
                grandSum += amount;
            })

            setTodayTotal(todaySum);
            setYesterdayTotal(yesterdaySum);
            setLast7DaysTotal(last7DaysSum);
            setLast30DaysTotal(last30DaysSum)
            setYearTotal(yearSum)
            setGrandTotal(grandSum);
        }

  return (
    <div className='container mt-4'>
        <div className='text-center'>
        <h2>Welcome,{userName}!</h2>
        <p className='text-muted'>Here's your expenses overview</p>
        </div>


        <div className='row g-4'>

          <div className='col-md-4'>
            <div className='card bg-primary text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-day me-2'></i>Today's Expense</h5>
                <p className='card-text fs-5'>₹ {todayTotal}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card bg-success text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-minus me-2'></i>Yesterday's Expense</h5>
                <p className='card-text fs-5'>₹ {yesterdayTotal}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card bg-warning text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-week me-2'></i>Weekly Expense</h5>
                <p className='card-text fs-5'>₹ {last7DaysTotal}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card bg-warning text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-day me-2'></i>Monthly Expense</h5>
                <p className='card-text fs-5'>₹ {last30DaysTotal}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card bg-secondary text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-minus me-2'></i>Yearly Expense</h5>
                <p className='card-text fs-5'>₹ {yearTotal}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='card bg-danger text-white text-center' style={{height:'150px'}}>

              <div className='card-body'>
                <h5 className='card-title'><i className='fas fa-calendar-week me-2'></i>Total Expense</h5>
                <p className='card-text fs-5'>₹ {grandTotal}</p>
              </div>
            </div>
          </div>


        </div>

        <div style={{width:'400px',height:'400px',margin:'auto'}} className='my-5'>

          <h4 className='text-center'>Expense Distribution</h4>
          <Pie data={pieData} />

        </div>
    </div>
    
  )
}

export default Dashboard
