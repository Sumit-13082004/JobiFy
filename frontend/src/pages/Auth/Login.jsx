import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
} from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false, // doubt
    });

    const [formState, setFormState] = useState({
        isLoading: false,
        error: {},
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <motion.div

            >
                <div className=''>
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* email */}
                    <div>
                        <label htmlFor="email">
                            Email Address
                        </label>
                        <div className=''>
                            <Mail className='' />
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.error.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                placeholder='Enter your email'
                            />
                        </div>
                        {formState.error.email && (
                            <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                                <AlertCircle className='text-red-500' size={16} />
                                {formState.error.email}
                            </p>
                        )}
                    </div>

                    {/* password */}
                    <div>
                        <label htmlFor="passwordId">
                            Password
                        </label>
                        <div className=''>
                            <Lock className='' />
                            <input
                                type={formState.showPassword ? 'text' : 'password'}
                                id='passwordId'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.error.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                placeholder='Enter your password'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={() => setFormState(prev => (
                                {
                                    ...prev,
                                    showPassword: !prev.showPassword,
                                }
                            ))}
                            className=''
                        >
                            {formState.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {formState.error.password && (
                            <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                                <AlertCircle className='text-red-500' size={16} />
                                {formState.error.password}
                            </p>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Login
