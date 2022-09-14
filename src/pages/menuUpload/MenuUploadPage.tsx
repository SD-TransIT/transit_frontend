import React, { useCallback, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PageBody from 'components/shared/PageBody';
import { IManualUploadFormsType } from 'models/manualUploadForms/IManualUploadForms';
import PageHeader from 'pages/types';
import { getManualUploadFormsRequest } from 'stores/actions/menuUpload/menuUploadActions';
import { RootState } from 'stores/reducers/rootReducer';

function ManualUploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const {
    manualUploadForms,
  } = useSelector(
    (state: RootState) => state.manualUploadForms,
  );

  useEffect(() => {
    dispatch(getManualUploadFormsRequest({ payload: {} }));
  }, [dispatch]);

  const callback = (pageName: string) => {
    navigate(`${pageName}`);
  };

  return (
    <PageBody title={format(PageHeader.manual_upload)}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {manualUploadForms?.map((tile: IManualUploadFormsType) => (
          <button type="button" key={tile.label} className="menu-tile" onClick={() => callback(tile.label)}>
            <p>{format(tile.label)}</p>
          </button>
        ))}
      </div>
    </PageBody>
  );
}

export default ManualUploadPage;
