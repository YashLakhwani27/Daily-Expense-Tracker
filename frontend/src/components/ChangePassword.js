import React , {useState} from 'react'
import {useNavigate} from "react-router-dom"
import {toast , ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {


    
     const navigate = useNavigate()
     const userId = localStorage.getItem('userId')
        const [formData ,setFormData] = useState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    
        const handleChange = (e) => {
            setFormData({...formData ,[e.target.name]: e.target.value})
        }


        const handleSubmit = async(e) => {
                e.preventDefault();
            

                if (formData.newPassword !== formData.confirmPassword) {
                    toast.error('New password does not match')
                    return
                }

                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/change_password/${userId}/`,{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword,
                    })
        
                });
                const data = await response.json()
                if (response.status === 200) {
                        toast.success(data.message)
                        setTimeout(() => {
                            navigate('/login')
                        },2000)
                    }
                    else{
        
                        toast.error(data.message)
                    }
                } catch (error) {
                    console.error('Error: ',error);
                    toast.error('Something went wrong. Try again.')
                }
            }

  return (
    <div className='container mt-5'>
           <div className='text-center mb-5'> 
           <h2> <i className='fas fa-key me-2'></i> Change Password</h2>
            <p className='text-muted'>Secure your expense with new password</p>
           </div>
    
           <form className='shadow rounded mt-3 p-4 border mx-auto' style={{maxWidth: '400px'}} onSubmit={handleSubmit}>
    
            <div className='mb-3'>
                <label className='form-label'>Old Password: </label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-lock'></i>
                    </span>
                   < input type='password' placeholder='Enter your old password' required name='oldPassword'onChange={handleChange} value={formData.oldPassword} className='form-control'/>
                </div>
            </div>
    
            <div className='mb-3'>
                <label className='form-label'>New Password: </label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-lock-open'></i>
                    </span>
                   < input type='password' placeholder='Enter your new password' required name='newPassword'onChange={handleChange} value={formData.newPassword} className='form-control'/>
                </div>
            </div>
    
            <div className='mb-3'>
                <label className='form-label'>Confirm Password: </label>
                <div className='input-group'>
                    <span className='input-group-text'>
                        <i className='fas fa-lock-open'></i>
                    </span>
                   < input type='password' placeholder='Confirm your new password'onChange={handleChange} value={formData.confirmPassword} required name='confirmPassword' className='form-control'/>
                </div>
            </div>
    
            <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-key me-2'></i>Change Password</button>
           </form>
    
           <ToastContainer />
        </div>
  )
}

export default ChangePassword
