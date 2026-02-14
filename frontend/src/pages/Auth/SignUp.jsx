import { useState } from "react"
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Building,
  AlertCircle,
  CheckCircle,
  Upload,
  UserCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: "",
    avatar: null
  });

  const [formState, setFormState] = useState({
    isLoading: false,
    errors: {},
    showPassword: false,
    strength: null,
    avatarPreview: null,
    success: false, // doubt
  });

  // utility functions
  const calculateStrength = (pwd) => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return score;
  };

  const strengthData = [
    { label: "", color: "bg-transparent" },
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Medium", color: "bg-yellow-500" },
    { label: "Strong", color: "bg-blue-500" },
    { label: "Very Strong", color: "bg-green-500" },
  ];

  const validateRole = (role) => {
    if (!formData.role) {
      return 'Please select a role';
    }
    return '';
  }

  const validateAvatar = (avatar) => {
    if (!avatar) return "";

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(avatar.type)) {
      return "Please upload a valid image file (JPEG or PNG)";
    }

    if (avatar.size > 5 * 1024 * 1024) {
      return "File size exceeds 5MB limit";
    }

    return '';
  }

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role
    }));

    if (formState.errors.role) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          role: '',
        }
      }));
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const error = validateAvatar(file);

      if (error) {
        setFormState(prev => ({
          ...prev,
          errors: { ...prev.errors, avatar: error }
        }));
        return
      }

      setFormData(prev => (
        {
          ...prev,
          avatar: file,
        }
      ));

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormState(prev => ({
          ...prev,
          avatarPreview: event.target.result,
          errors: {
            ...prev.errors,
            avatar: '',
          }
        }));
      }
      reader.readAsDataURL(file);
    }
  }

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formState.errors[name]) {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: '',
        }
      }));
    }

    if (name === 'password') {
      setFormState(prev => ({
        ...prev,
        strength: calculateStrength(value)
      }));
    }
  }

  const validateForm = () => {
    
  }

  const handleSubmit = (event) => {
    
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
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Account Created!</h2>
          <p className='text-gray-600 mb-4'>
            Welcome to JobiFy!
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
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Create Account</h2>
          <p className='text-gray-600'>Join thousands of professionals finding their dream jobs</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* fullname */}
          <div>
            <label htmlFor="fullName" className='block text-base font-medium text-gray-700 mb-2'>
              Full Name *
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type="text"
                id='fullName'
                name='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.fullName ? 'border-red-500' :
                  'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder='Enter your full name'
              />
            </div>
            {formState.errors.fullName && (
              <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* email */}
          <div>
            <label htmlFor="email" className='block text-base font-medium text-gray-700 mb-2'>
              Email Address *
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
                <AlertCircle className='w-4 h-4 mr-1' />
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
                placeholder='Create a strong password'
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
                <AlertCircle className='mr-1 w-5 h-5' />
                {formState.errors.password}
              </p>
            )}

            {/* Strength Bar */}
            <div className="h-2 w-full rounded-full overflow-hidden">
              <div
                className={`h-full ${strengthData[formState.strength]?.color || "bg-transparent"} transition-all duration-300`}
                style={{ width: `${formState.strength * 20}%` }}
              />
            </div>

            {/* Strength Text */}
            {formData.password && (
              <p
                className={`text-sm font-medium ${formState.strength <= 2
                  ? "text-red-500"
                  : formState.strength === 3
                    ? "text-yellow-500"
                    : "text-green-500"
                  }`}
              >
                {strengthData[formState.strength]?.label || "Enter a password"}
              </p>
            )}
          </div>

          {/* Avatar upload */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label htmlFor="avatarInput" className="cursor-pointer bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="">Upload Photo</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                <AlertCircle className='mr-1 w-5 h-5' />
                {formState.errors.avatar}
              </p>
            )}
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              I am a *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "jobseeker" ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-gray-500"}`}

              >
                <UserCheck className="w-8 h-8 mb-1 mx-auto" />
                <span className="font-medium">Job Seeker</span>
                <p className="text-xs text-gray-500">Looking for opportunities</p>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`p-4 rounded-lg border-2 transition-all ${formData.role === "employer" ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-gray-500"}`}

              >
                <Building className="w-8 h-8 mb-1 mx-auto" />
                <span className="font-medium">Employer</span>
                <p className="text-xs text-gray-500">Hiring talent</p>
              </button>
            </div>

            {formState.errors.role && (
              <div className='bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded relative' >
                <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                  <AlertCircle className='mr-1 w-5 h-5 text-red-500' />
                  {formState.errors.role}
                </p>
              </div>
            )}
          </div>

          {formState.errors.submit && (
            <div className='bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded relative' >
              <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                <AlertCircle className='mr-1 w-5 h-5 text-red-500' />
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
                <span className=''>Creating Account</span>
              </>
            ) : (
              <span className=''>Create Account</span>
            )}
          </button>

          <div className='w-full text-center mt-4'>
            <p className=''>
              Already have an account?
              <Link to='/login' className='text-blue-500 ml-1'>
                Sign In here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp;