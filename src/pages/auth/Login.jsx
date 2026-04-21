// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Input from '../../components/common/Input';
// import Button from '../../components/common/Button';
// import { GoogleLogin } from '@react-oauth/google';
// import { authService } from '../../services/auth.service';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: null });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       const response = await authService.login(formData.email, formData.password);
//       const userPayload = {
//         id: response.id,
//         fullName: response.fullName,
//         email: response.email,
//         role: response.role,
//         status: response.status
//       };
//       login(response.token, userPayload);
//       navigate('/');
//     } catch (err) {
//       setErrors({ apiError: err.response?.data?.message || 'Invalid email or password' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const response = await authService.googleLogin(credentialResponse.credential);
//       const userPayload = {
//         id: response.id,
//         fullName: response.fullName,
//         email: response.email,
//         role: response.role,
//         status: response.status
//       };
//       login(response.token, userPayload);
//       navigate('/');
//     } catch (err) {
//       setErrors({ apiError: err.response?.data?.message || 'Google Login failed on our server' });
//     }
//   };

//   const handleGoogleError = () => {
//     setErrors({ apiError: 'Google API specifically rejected the popup flow' });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-mesh py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Abstract Background Illustration */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src="/assets/login_bg.png" 
//           alt="Background" 
//           className="w-full h-full object-cover opacity-20 dark:opacity-10 mix-blend-overlay"
//         />
//       </div>

//       {/* Floating Animated Orbs */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-blob"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-blob [animation-delay:4s]"></div>

//       <div className="max-w-md w-full z-10 animate-fade-in-up">
//         <div className="glass-card p-10 sm:p-12 border border-white/40 dark:border-white/5 shadow-2xl backdrop-blur-3xl">
//           <div className="text-center mb-10">
//             <div className="mx-auto w-20 h-20 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-8 animate-float">
//                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
//             </div>
//             <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
//               Welcome Back
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//               Continue to <span className="text-gradient font-bold">Campus Hub</span>
//             </p>
//           </div>
          
//           {errors.apiError && (
//             <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 animate-shake">
//               <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
//               <p className="text-xs font-bold">{errors.apiError}</p>
//             </div>
//           )}
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <Input
//                 label="Email"
//                 id="email"
//                 type="email"
//                 placeholder="name@campus.edu"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//                 className="modern-input"
//               />
//               <Input
//                 label="Password"
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//                 className="modern-input"
//               />
//             </div>

//             <div className="flex items-center justify-between px-1">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input type="checkbox" className="w-4 h-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 checked:bg-blue-600 transition-all" />
//                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500">Remember</span>
//               </label>
//               <Link to="/forgot-password" ml-2 className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-indigo-600 transition-colors">
//                 Forgot?
//               </Link>
//             </div>

//             <Button type="submit" className="organic-button w-full flex justify-center items-center py-4 text-sm tracking-widest uppercase" disabled={isLoading}>
//               {isLoading ? (
//                 <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : 'Sign In'}
//             </Button>
//           </form>

//           <div className="mt-10 space-y-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-100 dark:border-white/5" />
//               </div>
//               <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
//                 <span className="px-4 bg-transparent backdrop-blur-xl">Social Entry</span>
//               </div>
//             </div>

//             <div className="flex justify-center transform hover:scale-[1.02] transition-transform">
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={handleGoogleError}
//               />
//             </div>

//             <p className="text-center text-xs text-gray-500 font-medium">
//               New explorer?{' '}
//               <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
