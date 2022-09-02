import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';
import { DialogType } from './types';

function Dialog({
  children,
  isOpen,
  setCustomDialogContent,
  onClose,
  onSubmitClick,
  onCancelClick,
  customSubmitButtonTitle,
  customCancelButtonTitle,
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
              className="max-h-screen md:w-2/5 lg:w-2/6 p-2 transform bg-transit-white rounded-xl flex flex-col"
            >
              <DialogHeadlessui.Description
                as="div"
                className="overflow-auto px-4 flex flex-col gap-3"
              >
                {setCustomDialogContent === false ? (
                  <div>
                    <div className="flex justify-start text-xl" data-testid="dialog-body">
                      {children}
                    </div>
                    <div className="flex justify-between gap-3 text-xl">
                      {onCancelClick && (
                      <CancelButton onClick={onCancelClick} title={customCancelButtonTitle} />
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
