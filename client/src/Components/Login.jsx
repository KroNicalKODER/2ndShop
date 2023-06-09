import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"

const Login = ({show, handleCloseLogin}) => {
    
    const handleLogin = () => {
        
    }
    const handleClose = (e) => {
        if(e.target.id === 'login-popup') handleCloseLogin()
    }
    if(!show) {
        return null;
     }
    return (
        <div id='login-popup' onClick={handleClose} className='fixed flex justify-center items-center transition duration-1000 ease-in-out inset-0 bg-opacity-30 backdrop-blur-sm bg-black z-[100]'>
            <div className=' border rounded-lg px-24 py-10 bg-slate-100 shadow-md'>
                <div className='w-full flex flex-col'>
                    <div className='mb-3'>LOGIN</div>
                    <form className='w-full flex flex-col'>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            className='w-full px-2 py-1 border-indigo-500 border-2'
                        />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='text-white w-full mt-5 px-2 py-1 border-indigo-500 border-2'
                        />
                    </form>
                    <div className='self-center mt-2'> OR</div>
                    <button className='mt-3 border border-black py-1 px-2 rounded-md hover:bg-slate-200 transition-all'>
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
                </div>
            </div>
        </div>
    )
}

export default Login