import { CancelButtonType } from './types';

const CancelButton = ({ onClick }: CancelButtonType ) => (
    <button
        type='button'
        onClick={onClick}
        className='inline-flex items-center gap-2 bg-transit-white px-4 py-2 rounded text-transit-green-dark border border-solid border-transit-green-dark'
        data-testid='cancel-button'
      >
        <p>Cancel</p>
      </button>
);

export default CancelButton;
