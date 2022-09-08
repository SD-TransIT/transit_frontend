import React, { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import PageBody from '../../../components/shared/PageBody';
import Searcher from '../../../components/shared/Searcher';
import Table from '../../../components/shared/table/Table';
import { ColumnType } from '../../../components/shared/table/types';
import { IModeOfTransport } from '../../../models/modeOfTransport/IModeOfTransport';
import { getModeOfTransportRequest } from '../../../redux/actions/modeOfTransport/modeOfTransportAction';
import { RootState } from '../../../redux/reducers/rootReducer';
import AddItemButton from '../../../shared/buttons/AddItemButton';
import PageHeader from '../../types';
import modeOfTransportColumns from './columnsModesOfTransport';

function ModeOfTransportMasterPage() {
  const dispatch = useDispatch();

  const columns: ColumnType[] = React.useMemo(() => modeOfTransportColumns, []);

  const {
    modes,
  } = useSelector(
    (state: RootState) => state.modeOfTransport,
  );

  useEffect(() => {
    dispatch(getModeOfTransportRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: IModeOfTransport) => {
    dispatch(getModeOfTransportRequest(formValues as any));
  };

  return (
    <PageBody title={PageHeader.mode_of_transport_master}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      {modes === undefined ? (
        <Table columns={columns} data={[{ }]} editAction={() => {}}>
          <p>0 Results</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={modes}
          editAction={() => {}}
          deleteAction={() => { }}
        >
          <p>{`${modes?.length} Results`}</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default ModeOfTransportMasterPage;
