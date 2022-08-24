import { Dialog as DialogHeadlessui, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import AddButton from '../buttons/AddButton';
import CancelButton from '../buttons/CancelButton';
import { DialogType } from './types';

const Dialog = ({
  children,
  isOpen,
  onClose,
  onAddClick,
  onCancelClick,
} : DialogType) => {

  const initialFocusRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment} data-testid='dialog'>
      <DialogHeadlessui initialFocus={initialFocusRef} as='div' className='fixed z-100' onClose={onClose} >
        <div className="fixed inset-0 bg-transit-black opacity-20" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogHeadlessui.Panel
              className='max-h-screen md:w-2/5 lg:w-2/6 p-4 transform bg-transit-white rounded-xl flex flex-col'>
              <DialogHeadlessui.Description
                as='div'
                className='overflow-auto py-4 px-4 flex flex-col gap-3'
              >
                <div className='flex justify-start text-xl' data-testid='dialog-body'>
                  {children}
                </div>
                <div className='flex justify-between gap-3 text-xl' >
                  {onCancelClick && (
                    <CancelButton onClick={onCancelClick}/>
                  )}
                  {onAddClick && (
                    <AddButton onClick={onAddClick} />
                  )}
                </div>
              </DialogHeadlessui.Description>
            </DialogHeadlessui.Panel>
          </Transition.Child>
        </div>
      </DialogHeadlessui>
    </Transition>
  );
};

export default Dialog;
