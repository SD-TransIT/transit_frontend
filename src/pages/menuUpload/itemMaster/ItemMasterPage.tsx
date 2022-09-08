import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import PageBody from 'components/shared/PageBody';
import Searcher from 'components/shared/Searcher';
import Table from 'components/shared/table/Table';
import { ColumnType } from 'components/shared/table/types';
import { getItemRequest } from 'actions/item/itemActions';
import { RootState } from 'reducers/rootReducer';
import AddItemButton from 'shared/buttons/AddItemButton';
import PageHeader from 'pages/types';
import itemColumns from 'pages/menuUpload/itemMaster/columnsItem';

function ItemMasterPage() {
  const dispatch = useDispatch();

  const {
    items,
  } = useSelector(
    (state: RootState) => state.item,
  );

  const columns: ColumnType[] = React.useMemo(() => itemColumns, []);

  useEffect(() => {
    dispatch(getItemRequest({ payload: {} }));
  }, [dispatch]);

  const refetch = (formValues: FieldValues) => {
    dispatch(getItemRequest(formValues as any));
  };

  return (
    <PageBody title={PageHeader.item_master}>
      <div className="p-4 bg-transit-white">
        <Searcher refetch={refetch} />
      </div>
      {items === undefined ? (
        <Table columns={columns} data={[{ }]} editAction={() => {}}>
          <p>0 Results</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      ) : (
        <Table
          columns={columns}
          data={items}
          editAction={() => { }}
          deleteAction={() => { }}
        >
          <p>{`${items?.length} Results`}</p>
          <AddItemButton onClick={() => {}} className="w-fit p-2">
            <AiOutlinePlus className="text-transit-white" />
          </AddItemButton>
        </Table>
      )}
    </PageBody>
  );
}

export default ItemMasterPage;
