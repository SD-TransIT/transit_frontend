import React from 'react';

function Unauthorized() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center gap-3" data-testid="unauthorized">
      <p className="text-3xl font-semibold mx-auto">401 - Unauthorized</p>
      <p className="font-semibold  mx-auto">{'You don\'t have permission to access this page'}</p>
    </div>
  );
}

export default Unauthorized;
