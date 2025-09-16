import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (message.text) setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return false;
    }

    if (!isLogin) {
      if (!formData.firstName) {
        setMessage({ type: 'error', text: 'First name is required for registration' });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match' });
        return false;
      }
      if (formData.password.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: isLogin ? 'Login successful!' : 'Registration successful!'
        });

        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token saved:', data.token);
          // TODO: Redirect to dashboard
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Authentication failed' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please check if your backend server is running.'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', firstName: '', lastName: '', confirmPassword: '' });
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-xs sm:max-w-sm md:max-w-md w-full space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 shadow-lg">
            <User className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Job Application Tracker
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            {isLogin ? 'Welcome back! Sign in to your account' : 'Join us and start tracking your applications'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 shadow-2xl rounded-xl md:rounded-2xl border border-white/20">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Name fields (only for registration) */}
            {!isLogin && (
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password field (only for registration) */}
            {!isLogin && (
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {/* Message display */}
            {message.text && (
              <div className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg md:rounded-xl transition-all duration-300 ${message.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                {message.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-medium">{message.text}</span>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-1 sm:pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-semibold rounded-lg md:rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </>
                )}
              </button>
            </div>

            {/* Toggle between login/register */}
            <div className="text-center pt-2 sm:pt-4" style={{ minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={toggleMode}
                className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-semibold focus:outline-none focus:underline transition-colors duration-200"
              >
                {isLogin
                  ? "New here? Create an account"
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 px-2">
            🔒 Secure authentication • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;