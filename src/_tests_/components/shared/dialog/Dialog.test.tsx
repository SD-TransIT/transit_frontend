import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../../../../shared/dialog/Dialog';
import MockObserverImplementation from '../../test-utils';

describe('Unit test for the Dialog component.', () => {
  const DIALOG_TEST_ID = 'dialog';
  const ADD_BUTTON_TEST_ID = 'add-button';
  const CANCEL_BUTTON_TEST_ID = 'cancel-button';
  const DIALOG_BODY_TEST_ID = 'dialog-body';
  const mockDialogBody = 'Mock Dialog Body';
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnCancel = jest.fn();

  beforeAll(() => {
    window.IntersectionObserver = MockObserverImplementation;
  });

  test('Should not be visible when is not open.', () => {
    render(
        <Dialog isOpen={false} onClose={mockOnClose} />,
    );
    expect(screen.queryByTestId(DIALOG_TEST_ID)).not.toBeInTheDocument();
  });

  test('Should match snapshot when Dialog has add and cancel button.', async () => {
    render(
          <Dialog
            isOpen={true}
            onClose={mockOnClose}
             onAddClick={mockOnAdd}
             onCancelClick={mockOnCancel}
          >
            {mockDialogBody}
          </Dialog>,
    );
    expect(screen.getByTestId(DIALOG_BODY_TEST_ID)).toHaveTextContent(mockDialogBody);
    expect(screen.getByTestId(ADD_BUTTON_TEST_ID)).toHaveTextContent('Add');
    expect(screen.getByTestId(CANCEL_BUTTON_TEST_ID)).toHaveTextContent('Cancel');
    expect(screen.getByTestId(DIALOG_TEST_ID)).toMatchSnapshot();
  });

  test('Should call the onCancelClick function after clicking the "Cancel" button.', () => {
    render(
          <Dialog
            isOpen={true}
              onClose={mockOnClose}
              onCancelClick={mockOnCancel}
          >
            {mockDialogBody}
          </Dialog>,
    );
    fireEvent.click(screen.getByTestId(CANCEL_BUTTON_TEST_ID));
    expect(mockOnCancel).toBeCalled();
  });
});
