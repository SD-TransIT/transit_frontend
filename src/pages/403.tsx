import React from 'react';

function Custom403() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center gap-3" data-testid="403-error">
      <p className="text-3xl font-semibold mx-auto">403 - Forbidden</p>
      <p className="font-semibold  mx-auto">{'You don\'t have permission to access this page'}</p>
    </div>
  );
}

export default Custom403;
