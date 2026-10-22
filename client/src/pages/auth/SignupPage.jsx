import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mountain, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import RoleSelectStep from './RoleSelectStep';
import { signupDetailsSchema } from '../../lib/validationSchemas';
import { useSignupMutation } from '../../features/auth/authApi';
import { ROLES, DESTINATIONS } from '../../utils/constants';
import { getDashboardPathForRole, ROLE_CONFIG } from '../../lib/roleConfig';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(ROLES.TOURIST);
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupDetailsSchema),
    defaultValues: {
      role: ROLES.TOURIST,
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      registrationNumber: '',
      destination: '',
      address: '',
    },
  });

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setValue('role', roleId, { shouldValidate: true });
  };

  const handleNextStep = () => {
    if (selectedRole) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await signup(data).unwrap();
      toast.success(`Welcome to Trawiller, ${response.data.user.name}!`);
      const targetPath = getDashboardPathForRole(response.data.user.role);
      navigate(targetPath, { replace: true });
    } catch (err) {
      const errorMsg = err?.data?.message || err?.message || 'Signup failed';
      toast.error(errorMsg);
    }
  };

  const isVendorRole = selectedRole !== ROLES.TOURIST;
  const currentRoleInfo = ROLE_CONFIG[selectedRole];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
            <Mountain className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Trawiller
          </span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200">
          {step === 1 ? (
            <RoleSelectStep
              selectedRole={selectedRole}
              onSelectRole={handleRoleSelect}
              onNextStep={handleNextStep}
            />
          ) : (
            <div className="space-y-6">
              {/* Back to Step 1 */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to Role Selection
                </button>
                <div className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Step 2 of 2 — {currentRoleInfo?.label}
                </div>
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-900">
                  Complete Your Account Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Enter your information below to register as a{' '}
                  <span className="font-semibold text-brand-600">
                    {currentRoleInfo?.label}
                  </span>
                  .
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                {/* Hidden Role Input */}
                <input type="hidden" {...register('role')} />

                {/* Personal / Account Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="you@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                      errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register('password')}
                      placeholder="••••••••"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                        errors.password ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      placeholder="••••••••"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                        errors.confirmPassword ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Vendor Adaptive Fields */}
                {isVendorRole && (
                  <div className="pt-4 mt-4 border-t border-slate-200 space-y-4 bg-slate-50/60 p-4 rounded-2xl">
                    <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                      Business Identity & Location Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Business Name
                        </label>
                        <input
                          type="text"
                          {...register('businessName')}
                          placeholder="e.g. Himalayan View Resort"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                            errors.businessName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                          }`}
                        />
                        {errors.businessName && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.businessName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Registration / License No.
                        </label>
                        <input
                          type="text"
                          {...register('registrationNumber')}
                          placeholder="e.g. HP-TOU-2024-889"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                            errors.registrationNumber ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                          }`}
                        />
                        {errors.registrationNumber && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.registrationNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Destination Region
                        </label>
                        <select
                          {...register('destination')}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                            errors.destination ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                          }`}
                        >
                          <option value="">Select Destination</option>
                          {DESTINATIONS.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                              {dest.name}, {dest.state}
                            </option>
                          ))}
                        </select>
                        {errors.destination && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.destination.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Full Business Address
                        </label>
                        <input
                          type="text"
                          {...register('address')}
                          placeholder="e.g. Mall Road, Near Circuit House"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 ${
                            errors.address ? 'border-red-500 bg-red-50/20' : 'border-slate-300 bg-white'
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.address.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Complete Registration & Launch Dashboard</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
