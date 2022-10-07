import React, { useCallback, useEffect } from 'react';

import ReactDropzone from 'react-dropzone';
import { useIntl } from 'react-intl';

import SubmitButton from 'shared/buttons/SubmitButton';
import ViewButton from 'shared/buttons/ViewButton';

export default function Dropzone({
  acceptedFileExt,
  onFileAccepted,
  onFileRejected,
  onSubmitUpload,
  uploadSelection,
  onClickViewButton,
}: any) {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [acceptedFile, setAcceptedFile] = React.useState<any>(null);
  const [rejectedFile, setRejectedFile] = React.useState(null);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const isFileDropped = () => !!acceptedFile || !!rejectedFile;

  useEffect(() => {
    if (acceptedFile && isFileDropped()) {
      if (uploadSelection !== null) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSelection, acceptedFile]);

  return (
    <>
      <ReactDropzone
        accept={acceptedFileExt}
        multiple={false}
        onDropAccepted={(file: any) => {
          setAcceptedFile(file.find(Boolean));
          setRejectedFile(null);
          setIsDragActive(false);
        }}
        onDropRejected={(file: any) => {
          setAcceptedFile(null);
          setRejectedFile(file.find(Boolean));
          setIsDragActive(false);
          setSubmitDisabled(true);
        }}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
      >
        {({ getRootProps, getInputProps }) =>
          /* eslint-disable-next-line */
           (!isFileDropped() ? (
             <section className="flex border-2 border-dashed border-transit-green-dark bg-transit-white">
               {/* eslint-disable-next-line react/jsx-props-no-spreading */}
               <div {...getRootProps({ className: isDragActive ? 'dropzone dropzone-active w-full' : 'dropzone w-full' })}>
                 {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                 <input {...getInputProps()} />
                 <div className="w-full p-10">
                   <div className="flex flex-row justify-center gap-2">
                     <p className="text-transit-black">
                       {`${format('excel_upload.instruction.label')}`}
                     </p>
                     <p className="text-transit-green-secondary underline">
                       {format('excel_upload.instruction.choice')}
                     </p>
                   </div>
                 </div>
               </div>
             </section>
          ) : (
            rejectedFile
              ? onFileRejected(rejectedFile, setRejectedFile, setSubmitDisabled)
              : onFileAccepted(acceptedFile, setAcceptedFile, setSubmitDisabled)
          ))}
      </ReactDropzone>
      <div className="flex justify-between text-lg font-medium gap-2 py-6">
        <ViewButton onClick={onClickViewButton} />
        <SubmitButton
          disabled={submitDisabled}
          onClick={() => {
            onSubmitUpload(acceptedFile);
            setSubmitDisabled(true);
            setAcceptedFile(null);
          }}
          className="w-fit"
          title="Upload"
        />
      </div>
    </>
  );
}
