import React from 'react';

function ConfirmDeleteMessage() {
  return (
    <div className="flex flex-col gap-2">
      <p className="float text-left text-[15px] text-transit-black font-medium">Are you sure you want to delete this item?</p>
    </div>
  );
}

export default ConfirmDeleteMessage;
