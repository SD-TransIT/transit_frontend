import React, { Fragment, useRef } from 'react';

import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react';

import CancelButton from 'shared/buttons/CancelButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import { DialogType } from 'shared/dialog/types';

function Dialog({
  children,
  isOpen,
  setCustomDialogContent,
  onClose,
  onSubmitClick,
  onCancelClick,
  customSubmitButtonTitle,
} : DialogType) {
  const initialFocusRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment} data-testid="dialog">
      <DialogHeadlessui initialFocus={initialFocusRef} as="div" className="fixed z-100" onClose={onClose}>
        <div className="fixed inset-0 bg-transit-black opacity-20" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogHeadlessui.Panel
              className="max-h-[900px] md:w-3/5 lg:w-3/5 xl:w-3/5 p-2 transform bg-transit-white rounded-xl flex flex-col"
            >
              <DialogHeadlessui.Description
                as="div"
                className="px-4 flex flex-col gap-3"
              >
                {setCustomDialogContent === false ? (
                  <div>
                    <div className="flex justify-start text-xl" data-testid="dialog-body">
                      {children}
                    </div>
                    <div className="flex justify-between gap-3 text-xl">
                      {onCancelClick && (
                        <CancelButton onClick={onCancelClick} />
                      )}
                      {onSubmitClick && (
                      <SubmitButton onClick={onSubmitClick} title={customSubmitButtonTitle} />
                      )}
                    </div>
                  </div>
                ) : (
                  children
                )}
              </DialogHeadlessui.Description>
            </DialogHeadlessui.Panel>
          </Transition.Child>
        </div>
      </DialogHeadlessui>
    </Transition>
  );
}

export default Dialog;
