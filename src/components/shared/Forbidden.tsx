import React from 'react';

function Forbidden() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center gap-3" data-testid="forbidden">
      <p className="text-3xl font-semibold mx-auto">403 - Forbidden</p>
      <p className="font-semibold  mx-auto">{'You don\'t have permission to access this page'}</p>
    </div>
  );
}

export default Forbidden;
