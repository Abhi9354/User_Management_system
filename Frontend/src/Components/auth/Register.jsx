import React, { useRef } from 'react';
import { postData } from '../../services/api-client';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../route';

const Register = () => {
const navigate=useNavigate()
  const emailRef=useRef("")
  const passwordRef=useRef("")
  const nameRef=useRef("")
  const ConfirmPasswordRef=useRef("")

  const handleFormSubmit = async() => {
    const userData={
      "name":nameRef.current.value,
      "email":emailRef.current.value,
      "password":passwordRef.current.value,
    }
    console.log('userData',userData);
    try {
      const response=await postData(import.meta.env.VITE_BACKEND_URL+'/register',userData);
      
      console.log('response',response);
      if(response.status===200){
       

        alert('user created successfully')
      nameRef.current.value=""
      emailRef.current.value=""
      passwordRef.current.value=""
      ConfirmPasswordRef.current.value=""
      navigate(ROUTE.LOGIN)
    }
      
    } catch (error) {
      console.log('error in register', error);
    }

  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={(e)=>{e.preventDefault()}}>
            <div className="relative mt-8">
             
              <input ref={nameRef} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
            </div>

           
            <div className="relative mt-6">
             
              <input ref={emailRef} type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
            </div>

            <div className="relative mt-4">
             
              <input ref={passwordRef} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
            </div>

            <div className="relative mt-4">
             
              <input ref={ConfirmPasswordRef} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
            </div>

            <div className="mt-6">
              <button  onClick={handleFormSubmit} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>
              <div className="mt-6 text-center ">
                <a href="/" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
