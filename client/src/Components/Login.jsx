import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {auth, provider} from '../Firebase'
import { signInWithPopup } from 'firebase/auth'

import "bootstrap-icons/font/bootstrap-icons.css"
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../Redux/userSlice'

const Login = ({show, handleCloseLogin}) => {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const [err,setErr] = useState()
    const dispatch = useDispatch()

    const handleSignInWithGoogle = (e) => {
        dispatch(loginStart())
        signInWithPopup(auth, provider).then(async (result)=>{
            console.log(result)
            await axios.post("http://localhost:8800/api/auth/google",{
                name: result.user.displayName,
                email: result.user.email,
                avatarUrl: result.user.photoURL
            })
        }).then((res)=>{
            dispatch(loginSuccess(res.data))
            setErr(<div className='font-inter text-green-500 text-xs mt-3'>Logged In successfully</div>)
        }).catch((error)=>{
            dispatch(loginFailure())
            setErr(<div className='font-inter text-red-500 text-xs mt-3'>Invalid email or password</div>)
        })
    }
    
    const handleLogin = async (e) => {

        e.preventDefault()
        dispatch(loginStart())
        try {
            const user = await axios.post('/auth/login', {email,password})
            dispatch(loginSuccess(user.data))
            setErr(<div className='font-inter text-green-500 text-xs mt-3'>Logged In successfully</div>)

        } catch (error) {
            setErr(<div className='font-inter text-red-500 text-xs mt-3'>Invalid email or password</div>)
            dispatch(loginFailure())
        }
    }
    const handleClose = (e) => {
        if(e.target.id === 'login-popup') handleCloseLogin()
        setErr()
    }
    if(!show) {
        return null;
     }
    return (
        <div id='login-popup' onClick={handleClose} className='fixed flex justify-center items-center transition duration-1000 ease-in-out inset-0 bg-opacity-30 backdrop-blur-sm bg-black z-[100]'>
            <div className=' border rounded-lg px-20 py-10 bg-slate-100 shadow-md'>
                <div className='w-full flex flex-col'>
                    <div className='mb-3'>LOGIN</div>
                    <form className='w-full flex flex-col'>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            className='w-full px-2 py-1 border-indigo-500 border-2'
                            onChange={e=>setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            onChange={e=>setpassword(e.target.value)}
                            className='  w-full mt-5 px-2 py-1 border-indigo-500 border-2'
                        />
                    </form>
                    <div className='self-center mt-2'> OR</div>
                    <button onClick={handleSignInWithGoogle} className='mt-3 border border-black py-1 px-2 rounded-md hover:bg-slate-200 transition-all'>
                        Log in with google <i className='bi bi-google text-blue-800 ml-2' />
                    </button>
                </div>
                <div className='mt-10'>
                    <button type="button"
                        className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={handleCloseLogin}
                        >

                        Close
                    </button>
                    <button type="button"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-10"
                        onClick={handleLogin}
                        >
                        Login
                    </button>
                    {err}
                </div>
            </div>
        </div>
    )
}

export default Login