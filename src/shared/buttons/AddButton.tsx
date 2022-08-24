import { AddButtonType } from './types';

const AddButton = ({ onClick }: AddButtonType ) => (
      <button
        type='button'
        onClick={onClick}
        className='inline-flex items-center gap-2 bg-transit-green-dark px-4 py-2 rounded text-transit-white'
        data-testid='add-button'
      >
        <p>Add</p>
      </button>
);

export default AddButton;
