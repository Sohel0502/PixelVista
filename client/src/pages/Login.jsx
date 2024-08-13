import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { login } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {

  const dipatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL+ "/login",{
        email,
        password
      })
      const data = await res.data;
      toast.success(data.message);
      dipatch(login(data));
      navigate(`/${data.role}/profile`);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  return (
    <div className='mt-20 sm:mt-10 min-h-screen flex  items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-3xl px-5 py-6 w-full  sm:w-[27vw]'>
        <h1 className='text-2xl font-bold text-center mb-4'>Lets Connect..</h1>
        <form onSubmit={handleLogin}>
          
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
            <input type='text' name='email'id='email' placeholder='your@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} className='shadow-md rounded-md w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-black focus:border-black'/>
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input type='password' name='password'id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className='shadow-md rounded-md w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-black focus:border-black'/>
          </div>
          <a href='#' className='text-xs text-gray-500 hover:text-black'>Forgot Password?</a>
          <div className='flex items-center justify-end mb-4'>
            <Link className='text-xs text-black ' to="/signup"> Create Account </Link>
          </div>
          <button type='submit' className='w-full px-2 py-4 rounded-md text-sm font-medium text-white bg-black'>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login