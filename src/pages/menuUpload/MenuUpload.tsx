import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageBody from '../../components/shared/PageBody';
import { IManualUploadFormsType } from '../../models/manualUploadForms/IManualUploadForms';
import { getManualUploadFormsRequest } from '../../redux/actions/menuUpload/menuUploadActions';
import { RootState } from '../../redux/reducers/rootReducer';
import PageHeader from '../types';

const menuTileStyle = 'flex justify-start bg-transit-white px-6 py-4 rounded border border-transit-grey hover:border-x hover:border-transit-green-dark font-normal font-transit-black hover:text-transit-green-dark';

function ManualUploadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <PageBody title={PageHeader.manual_upload}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {manualUploadForms?.map((tile: IManualUploadFormsType) => (
          <button type="button" className={menuTileStyle} onClick={() => { callback(tile.label); }}>
            <p>{tile.name}</p>
          </button>
        ))}
      </div>
    </PageBody>
  );
}

export default ManualUploadPage;
