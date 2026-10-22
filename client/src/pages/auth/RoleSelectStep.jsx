import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ROLE_CONFIG } from '../../lib/roleConfig';
import { ROLES } from '../../utils/constants';

export default function RoleSelectStep({ selectedRole, onSelectRole, onNextStep }) {
  // Exclude Admin from self-serve signup
  const signupRoles = Object.values(ROLE_CONFIG).filter(
    (role) => role.id !== ROLES.ADMIN
  );

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          How do you want to use Trawiller?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Select your account type. Whether you are traveling or offering local services, Trawiller empowers your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {signupRoles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <div
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              className={`relative bg-white p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-600 ring-2 ring-brand-600 bg-brand-50/20 shadow-md'
                  : 'border-slate-200 hover:border-brand-500/50 hover:shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-brand-600">
                  <CheckCircle2 className="w-5 h-5 fill-brand-600 text-white" />
                </div>
              )}

              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {role.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600">
                <span>{role.id === ROLES.TOURIST ? 'Traveler Account' : 'Vendor Account'}</span>
                <span>Select &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onNextStep}
          disabled={!selectedRole}
          className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
