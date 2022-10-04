import React, { useCallback, useEffect } from 'react';

import { ThunkDispatch } from '@reduxjs/toolkit';
import { FieldValues, useForm } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ValidationError from 'components/shared/ValidationError';
import { ITokenInput } from 'models/token/ITokenInput';
import { Paths } from 'routes/paths';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';
import { fetchTokenRequest, refreshTokenRequest } from 'stores/actions/token/tokenActions';
import { RootState } from 'stores/reducers/rootReducer';
import { sessionToken } from 'stores/reducers/tokenReducer';
import { FetchTokenRequestPayload, RefreshTokenRequestPayload } from 'stores/types/tokenType';
import isAuthenticated from 'utils/authHelper';

interface ISignInFormProps {
  signIn: (params: FetchTokenRequestPayload) => void;
  refresh: (params: RefreshTokenRequestPayload) => void;
}

type AuthAction = {
  type: string,
  error?: unknown
};

function SignInForm({ refresh, signIn }: ISignInFormProps) {
  const navigate = useNavigate();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    credentialsError,
    token,
  } = useSelector(
    (state: RootState) => state.token,
  );


  const callback = () => {
    navigate(Paths.landing);
  };

  const callbackRefresh = () => {
    navigate(-1);
  };

  const refreshToken = () => {
    const token = JSON.parse(localStorage.getItem(sessionToken) as string);
    const data: any = {
      values: {
        refresh: token.refresh,
      },
      callback: callbackRefresh,
    };
    refresh(data);
  };

  useEffect(() => {
    const isToken = !!localStorage.getItem(sessionToken);
    if (isAuthenticated()) {
      navigate(Paths.landing);
    } else if (isToken) {
      refreshToken();
    }
  }, [token]);

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

  const onSubmit = (formValues: FieldValues) => {
    login(formValues as ITokenInput);
  };

  return (
    <div className="bg-transit-white m-auto w-full max-w-lg h-full max-h-96 rounded-lg py-8 px-4 gap-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-2xl">{format('sign_in.label')}</p>
            <p className="text-sm text-transit-black-light">{format('sign_in.massage')}</p>
          </div>
          {credentialsError
          && (
          <div className="flex flex-row h-12 border border-transit-red-primary rounded w-full items-center px-3 gap-3">
            <RiErrorWarningLine className="text-xl text-transit-red-primary" />
            <p className="font-medium text-sm text-black">{format('validation.error.credentials')}</p>
          </div>
          )}
          <div className="h-12">
            <Input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('username', { required: true })}
              name="username"
              id="floatingInput"
              placeholder={format('sign_in.username.placeholder')}
              type="text"
              isInvalid={Boolean(errors.username)}
              className="min-h-full"
            />
            <div className="pb-2">
              {errors.username && <ValidationError value={format('validation.error.field_required')} />}
            </div>
          </div>
          <div className="h-12">
            <Input
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', { required: true })}
              name="password"
              id="floatingInput"
              placeholder={format('sign_in.password.placeholder')}
              type="password"
              isInvalid={Boolean(errors.password)}
              className="min-h-full"
            />
            <div className="pb-2">
              {errors.password && <ValidationError value={format('validation.error.field_required')} />}
            </div>
          </div>
          <div className="h-12">
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              title={format('sign_in.label')}
            />
          </div>
          <div className="flex flex-row gap-px">
            <p>{format('sign_in.not_registered')}</p>
            <a className="text-transit-green-dark text-decoration-line: underline" href="/">{format('sign_in.create_an_account')}</a>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, AuthAction>): ISignInFormProps => ({
  signIn: (params: FetchTokenRequestPayload) => dispatch(fetchTokenRequest(params)),
  refresh: (params: RefreshTokenRequestPayload) => dispatch(refreshTokenRequest(params)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
