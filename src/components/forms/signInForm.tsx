import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import isAuthenticatedProperly from '../../utils/authHelper';
import { fetchTokenRequest, refreshTokenRequest } from '../../redux/actions/token/tokenActions';
import { FetchTokenRequestPayload, RefreshTokenRequestPayload } from '../../redux/types/type';
import SubmitButton from '../../shared/buttons/SubmitButton';
import { ITokenInput } from '../../models/token/ITokenInput';
import Input from '../../shared/inputs/input';

function SignInForm(props: any) {
  const { refresh, signIn } = props;

  const navigate = useNavigate();

  const callback = () => {
    navigate('/');
  };

  const refreshToken = () => {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const data: any = {
      values: {
        refresh: token.refresh,
      },
      callback,
    };
    refresh(data);
  };

  useEffect(() => {
    const isToken = !!localStorage.getItem('token');
    if (isAuthenticatedProperly()) {
      navigate('/');
    } else if (isToken) {
      refreshToken();
    }
  });

  const login = (formValues: ITokenInput) => {
    const data: any = {
      values: formValues,
      callback,
    };
    signIn(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (formValues: any) => {
    login(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded px-8 pt-6 pb-8 mb-4 space-y-4">
      <h1 className="text-4xl">Sign in</h1>
      <p className="text-sm">Sign up on the internal platform</p>
      <div className="mb-4">
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('username', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-12"
          name="username"
          id="floatingInput"
          placeholder="Username"
          type="text"
        />
        {errors.username && <span className="text-transit-red">This is required</span>}
      </div>

      <div className="mb-6">
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-12"
          name="password"
          id="floatingInput"
          placeholder="Password"
          type="password"
        />
        {errors.password && <span className="text-transit-red">This is required</span>}
      </div>
      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        title="Log in"
        className="gap-2 bg-transit-green-dark px-4 py-2 rounded text-transit-white w-full h-12"
      />

      <p>Not registered? Create account</p>
    </form>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (params: FetchTokenRequestPayload) => dispatch(fetchTokenRequest(params)),
  refresh: (params: RefreshTokenRequestPayload) => dispatch(refreshTokenRequest(params)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
