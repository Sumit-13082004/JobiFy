import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Loader,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/helper.js';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false, // doubt
    });

    const [formState, setFormState] = useState({
        isLoading: false,
        errors: {},
        showPassword: false,
        success: false, // doubt
    });

    // utility functions
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formState.errors[name]) {
            setFormState(prev => (
                {
                    ...prev,
                    errors: {
                        ...prev.errors,
                        [name]: '',
                    }
                }
            ))
        }
    }

    const validateForm = () => {
        const errors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
        }

        Object.keys(errors).forEach(key => {
            if (!errors[key]) {
                delete errors[key];
            }
        });

        setFormState(prev => ({
            ...prev,
            errors,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setFormState(prev => (
            {
                ...prev,
                isLoading: true,
            }
        ));

        try {
            // API call to login
        } catch (error) {
            setFormState(prev => (
                {
                    ...prev,
                    isLoading: false,
                    errors: {
                        ...prev.errors,
                        submit: ''
                    }
                }
            ));
        }
    }
    
    // doubt -_
    if (formState.success) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full'
                >
                    <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
                    <p className='text-gray-600 mb-4'>
                        You have been successfully logged in.
                    </p>
                    <div className='animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto' />
                    <p className='text-sm text-gray-500 mt-2'>Redirecting to your dashboard...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'
            >
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
                    <p className='text-gray-600'>Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* email */}
                    <div>
                        <label htmlFor="email" className='block text-base font-medium text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                placeholder='Enter your email'
                            />
                        </div>
                        {formState.errors.email && (
                            <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                                <AlertCircle className='w-4 h-4 mr-1'  />
                                {formState.errors.email}
                            </p>
                        )}
                    </div>

                    {/* password */}
                    <div className=''>
                        <label htmlFor="passwordId" className='block text-base font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                            <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                type={formState.showPassword ? 'text' : 'password'}
                                id='passwordId'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                placeholder='Enter your password'
                            />
                            <button
                                type='button'
                                onClick={() => setFormState(prev => (
                                    {
                                        ...prev,
                                        showPassword: !prev.showPassword,
                                    }
                                ))}
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none'
                            >
                                {formState.showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                        {formState.errors.password && (
                            <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                                <AlertCircle className='mr-1 w-5 h-5'  />
                                {formState.errors.password}
                            </p>
                        )}
                    </div>

                    {formState.errors.submit && (
                        <div className='bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded relative' >
                            <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                                <AlertCircle className='mr-1 w-5 h-5 text-red-500'  />
                                {formState.errors.submit}
                            </p>
                        </div>
                    )}

                    <button
                        type='submit'
                        disabled={formState.isLoading}
                        className='w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 cursor-pointer'
                    >
                        {formState.isLoading ? (
                            <>
                                <Loader className='animate-spin w-5 h-5 text-white mx-auto' />
                                <span className=''>Signing In...</span>
                            </>
                        ) : (
                            <span className=''>Sign In</span>
                        )}
                    </button>

                    <div className='w-full text-center mt-4'>
                        <p className=''>
                            Don't have an account?
                            <Link to='/signup' className='text-blue-500 ml-1'>
                                Create one here
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
