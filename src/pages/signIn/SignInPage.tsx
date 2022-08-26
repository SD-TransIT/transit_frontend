import React, { useRef, useEffect } from 'react';
import SignInForm from '../../components/forms/signInForm';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import isAuthenticated from '../../utils/authHelper';
import { fetchTokenRequest, refreshTokenRequest } from '../../redux/actions/token/tokenActions';
import { FetchTokenRequestPayload, RefreshTokenRequestPayload } from '../../redux/types/type';

function SignInPage(props: any) {
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
    if (isAuthenticated()) {
      navigate('/');
    } else if (isToken) {
      refreshToken();
    }
  });

  const login = () => {
    const data: any = {
      values: {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      },
      callback,
    };
    signIn(data);
  };

  return (
    <div className="flex h-screen w-screen bg-transit-grey" data-testid="sign-in-page">
      <div className="sm:w-1/2 bg-hero-image bg-no-repeat bg-cover" />
      <div className="w-full sm:w-1/2">
        <div className="flex h-screen">
          <div className="bg-transit-white m-auto w-full max-w-lg h-full max-h-96">
            <SignInForm />
          </div>
        </div>
      </div>
      </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  signIn: (params: FetchTokenRequestPayload) => dispatch(fetchTokenRequest(params)),
  refresh: (params: RefreshTokenRequestPayload) => dispatch(refreshTokenRequest(params)),
});

export default connect(null, mapDispatchToProps)(SignInPage);
