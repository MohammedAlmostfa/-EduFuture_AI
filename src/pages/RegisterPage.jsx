// RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import PasswordInput from '../components/ui/PasswordInput';
import Button from '../components/ui/Button';
import Divider from '../components/ui/Divider';
import SocialButton from '../components/ui/SocialButton';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { registerData } from '../data/registerData';

const RegisterPage = () => {
  const {
    formData,
    errors,
    generalError,
    isLoading,
    passwordStrength,
    handleChange,
    handleSubmit,
    handleGoogleRegister,
  } = useRegisterForm();

  const strengthColors = {
    0: registerData.passwordStrength.levels[0].color,
    1: registerData.passwordStrength.levels[1].color,
    2: registerData.passwordStrength.levels[2].color,
    3: registerData.passwordStrength.levels[3].color,
  };
  const strengthText = {
    0: registerData.passwordStrength.levels[0].text,
    1: registerData.passwordStrength.levels[1].text,
    2: registerData.passwordStrength.levels[2].text,
    3: registerData.passwordStrength.levels[3].text,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="w-full max-w-[448px] bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-200/40">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center bg-gradient-to-b from-white to-indigo-50/20">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl mx-auto mb-4 my-20 flex items-center justify-center shadow-md shadow-indigo-200 rotate-3 transition-transform hover:rotate-0 duration-300">
              <img src={registerData.logo.src} alt={registerData.logo.alt} className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {registerData.title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">{registerData.heading}</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium">{registerData.subheading}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-2 space-y-5">
          {generalError && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-xl text-sm border-r-4 border-red-500 shadow-sm">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{generalError}</span>
            </div>
          )}

          <InputField
            id={registerData.fields.fullName.id}
            label={registerData.fields.fullName.label}
            type={registerData.fields.fullName.type}
            placeholder={registerData.fields.fullName.placeholder}
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            disabled={isLoading}
            autoComplete={registerData.fields.fullName.autoComplete}
            className="transition-all duration-200 focus:scale-[1.01]"
          />

          <InputField
            id={registerData.fields.email.id}
            label={registerData.fields.email.label}
            type={registerData.fields.email.type}
            placeholder={registerData.fields.email.placeholder}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
            autoComplete={registerData.fields.email.autoComplete}
            className="ltr transition-all duration-200 focus:scale-[1.01]"
          />

          <div className="space-y-1">
            <PasswordInput
              id={registerData.fields.password.id}
              label={registerData.fields.password.label}
              placeholder={registerData.fields.password.placeholder}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
              autoComplete={registerData.fields.password.autoComplete}
              showToggle
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{registerData.passwordStrength.label}</span>
                  <span className={`font-medium ${registerData.passwordStrength.levels[passwordStrength]?.textColor || ''}`}>
                    {strengthText[passwordStrength]}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[passwordStrength]} transition-all duration-300 rounded-full`}
                    style={{ width: `${(passwordStrength / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <PasswordInput
            id={registerData.fields.confirmPassword.id}
            label={registerData.fields.confirmPassword.label}
            placeholder={registerData.fields.confirmPassword.placeholder}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isLoading}
            autoComplete={registerData.fields.confirmPassword.autoComplete}
            showToggle
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id={registerData.fields.acceptTerms.id}
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-2 transition-all"
            />
            <label htmlFor={registerData.fields.acceptTerms.id} className="text-sm text-gray-600 leading-tight">
              {registerData.fields.acceptTerms.label}{' '}
              <Link to={registerData.terms.link} className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium">
                {registerData.terms.label}
              </Link>{' '}
              و{' '}
              <Link to={registerData.terms.privacyLink} className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium">
                {registerData.terms.privacyLabel}
              </Link>
            </label>
          </div>
          {errors.acceptTerms && <p className="text-red-600 text-xs mt-1">{errors.acceptTerms}</p>}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            className="relative h-12 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform active:scale-95 font-semibold text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{registerData.buttons.submitting}</span>
              </div>
            ) : (
              registerData.buttons.submit
            )}
          </Button>
        </form>

        <Divider text={registerData.dividerText} className="mx-8 my-2 text-gray-400" />

        <div className="px-8 pb-4">
          <SocialButton
            icon={
              <div
                dangerouslySetInnerHTML={{ __html: registerData.googleIconSvg }}
                className="w-5 h-5"
              />
            }
            onClick={handleGoogleRegister}
            disabled={isLoading}
            className="w-full h-11 rounded-xl border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-100 transition-all duration-200 text-gray-700 font-medium"
          >
            {registerData.buttons.google}
          </SocialButton>
        </div>

        {/* Login Link */}
        <div className="px-8 pb-8 pt-4 text-center border-t border-gray-100 mt-2">
          <p className="text-sm text-gray-600">
            {registerData.footer.haveAccount}{' '}
            <Link
              to={registerData.footer.loginLink}
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              {registerData.footer.loginText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;