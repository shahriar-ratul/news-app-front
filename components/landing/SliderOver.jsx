/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineViewList, HiOutlineX } from 'react-icons/hi';

export default function SliderOver({ open, setOpen, title, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed inset-0 overflow-hidden z-[999] '
        open={open}
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-y-0 left-0 pr-10 max-w-full flex'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-150'
              enterFrom='translate-x-0'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-150 '
              leaveFrom='translate-x-0'
              leaveTo='translate-x-0'
            >
              <div className='relative w-screen max-w-md'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-150'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-150'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-8 pt-4 pl-2 flex sm:-mr-10 sm:pl-4'>
                    <button
                      className='rounded text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                      onClick={() => setOpen(false)}
                    >
                      <span className='sr-only'>Close panel</span>
                      <HiOutlineX className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                </Transition.Child>
                <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
                  <div className='px-4 sm:px-6'>
                    <Dialog.Title className='text-lg font-medium text-gray-900'>
                      {title}
                    </Dialog.Title>
                  </div>
                  <div className='mt-6 relative flex-1 px-4 sm:px-6'>
               
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
