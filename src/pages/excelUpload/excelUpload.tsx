import React, { useCallback } from 'react';

import { IconContext } from 'react-icons';
import { RiCloseFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Dropzone from 'components/shared/dropzone/Dropzone';
import PageBody from 'components/shared/PageBody';
import SimpleSelect from 'components/shared/SimpleSelect';
import ValidationError from 'components/shared/ValidationError';
import SubmitButton from 'shared/buttons/SubmitButton';
import Input from 'shared/inputs/input';
import { postExcelUploadRequest } from 'stores/actions/excelUpload/excelUploadActions';
import { RootState } from 'stores/reducers/rootReducer';
import { PostExcelUploadRequestPayload } from 'stores/types/excelUploadType';

function ExcelUploadPage() {
  const [uploadType, setUploadType] = React.useState(null);

  const dispatch = useDispatch();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const navigate = useNavigate();

  const {
    uploaded,
    error,
  } = useSelector(
    (state: RootState) => state.excelUpload,
  );

  const excelUploadOptions = [
    { value: null, label: format('app.excel_upload.selection.label') },
    { value: 'customer_detail', label: format('customer') },
    { value: 'item_detail', label: format('item_details') },
    { value: 'item_master', label: format('item') },
    { value: 'order_detail', label: format('order_details') },
    { value: 'supplier_master', label: format('supplier') },
  ];

  const onSubmitUpload = (uploadedFile: any) => {
    dispatch(postExcelUploadRequest(uploadedFile as PostExcelUploadRequestPayload, uploadType));
  };

  const inputAfterSendingFile = (
    file: any,
    setFile: any,
    setDisabledSubmit: any,
    isInvalid = false,
  ) => (
    <>
      <div className="flex justify-end items-center relative">
        <Input
          type="search"
          placeholder={isInvalid ? file.file.path : file.path}
          isInvalid={isInvalid}
        />
        <IconContext.Provider
            // eslint-disable-next-line
            value={{ className: 'absolute mr-2 w-10 h-6' }}
        >
          <RiCloseFill
            onClick={() => {
              setDisabledSubmit(true);
              setFile(null);
            }}
          />
        </IconContext.Provider>
      </div>
      {isInvalid && <ValidationError value={format('app.excel_upload.error.label')} />}
    </>
  );

  const onFileAccepted = (file: any, setFile: any, setDisabledSubmit: any) => (
    inputAfterSendingFile(file, setFile, setDisabledSubmit)
  );

  const onFileRejected = (file: any, setFile: any, setDisabledSubmit: any) => (
    <>
      <p className="text-sm text-left text-transit-red">
        {format('app.excel_upload.error.header')}
      </p>
      {inputAfterSendingFile(file, setFile, setDisabledSubmit, true)}
    </>
  );

  return (
    <PageBody title="">
      <div className="inline-block pb-4">
        <p className="text-2xl text-center text-transit-black">
          {format('app.excel_upload.label')}
        </p>
        <p className="text-lg text-center text-transit-black">
          {format('app.excel_upload.about.label')}
        </p>
      </div>
      <div className={`bg-transit-white mx-auto w-1/2 ${uploaded ? 'p-16' : 'pt-8 px-8 py-8'}`}>
        {uploaded ? (
          <>
            <p className="text-2xl text-center text-transit-black">
              {error
                ? format('app.excel_upload.error_upload.header')
                : format('app.excel_upload.success.header')}
            </p>
            <p className="text-sm text-center text-transit-grey-dark">
              {error
                ? format('app.excel_upload.error_upload.label')
                : format('app.excel_upload.success.detail')}
            </p>
            <div className="flex justify-center text-lg font-medium gap-2 py-4">
              <SubmitButton
                onClick={() => {
                  // setIsTryAgain(true);
                  navigate(0);
                }}
                className="w-fit"
                title={error ? format('app.excel_upload.upload_try_again.label') : format('app.excel_upload.upload_new_file.label')}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full py-4">
              <SimpleSelect
                options={excelUploadOptions}
                onChange={(option: any) => setUploadType(option.value)}
                placeholder={format('app.excel_upload.selection.label')}
              />
            </div>
            <Dropzone
              onSubmitUpload={onSubmitUpload}
              onFileAccepted={onFileAccepted}
              onFileRejected={onFileRejected}
              acceptedFileExt={{
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                'application/vnd.ms-excel': ['.xls'],
              }}
              uploadSelection={uploadType}
            />
          </>
        )}
      </div>
    </PageBody>
  );
}

export default ExcelUploadPage;
