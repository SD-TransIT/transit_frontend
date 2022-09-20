import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { RiDeleteBin7Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import EditableTable from 'components/shared/table/EditableTable';
import { DeliveryHoursType } from 'pages/types';
import Input from 'shared/inputs/input';
import { RootState } from 'stores/reducers/rootReducer';
import { customerWeekDaysUrl } from 'stores/sagas/customerWeekDaysSaga';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequest } from 'utils/apiClient';
import { DEFAULT_OFFSET, EMPTY_SEARCHER, FIRST_PAGE } from 'utils/consts';
import dayNumberToLabel from 'utils/dayNumberToLabel';

const options = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 7, label: 'Sunday' },
];

type Props = {
  customerId: any,
  customerWeekDays: any,
  onDeliveryHoursChange: (deliveryHours: any) => void,
};

function CustomerMasterDeliveryHours(
  { customerWeekDays, onDeliveryHoursChange, customerId }: Props,
) {
  const [, setPageCount] = useState(0);
  const [, setNumberOfAvailableData] = useState(0);
  const [, setPage] = useState(FIRST_PAGE);
  const [data, setData] = useState<any>();
  const [, setSearcher] = useState(EMPTY_SEARCHER);

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const [deliveryHours, setDeliveryHours] = useState<any[]>([]);
  console.log('customerWeekDays', customerWeekDays);
  const {
    customerWeekDay,
  } = useSelector(
    (state: RootState) => state.customerWeekDays,
  );

  const calculatePagesCount = (pageSize: number, totalCount: number) => (
    totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
  );

  const fetchData = useCallback(async (pageNumber: number, pageSize: number, search: string) => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequest(customerWeekDaysUrl, {
          page: pageNumber,
          searcher: search,
        }, true);

        setPage(pageNumber);
        setData(result.results);
        setPageCount(calculatePagesCount(DEFAULT_OFFSET, result.count));
        setNumberOfAvailableData(result.count);
      }
    } catch (error) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (customerWeekDay !== undefined) {
      setPage(FIRST_PAGE);
      setSearcher(EMPTY_SEARCHER);
      fetchData(FIRST_PAGE, DEFAULT_OFFSET, EMPTY_SEARCHER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerWeekDay]);
/* eslint-disable */

  useEffect(() => {
    if (data !== undefined) {
      const currentDeliveryHours = data.filter((deliveryHour: any) =>  deliveryHour.customer === customerId)
      setDeliveryHours(currentDeliveryHours.map((currentDeliveryHour: any) => {
        return {
          id: currentDeliveryHour.id,
          day: currentDeliveryHour.day,
          customer: currentDeliveryHour.customer,
          opening_time: currentDeliveryHour.opening_time,
          closing_time: currentDeliveryHour.closing_time,
          closed: currentDeliveryHour.closed
        }
      }));
    }
  }, [data, customerId]);
  useEffect(() => {
    onDeliveryHoursChange(deliveryHours)
  }, [deliveryHours])

  const addNewDeliveryHours = () => {
    setDeliveryHours([...deliveryHours, {
      id: Math.floor(Math.random()*10000), day: 1, customer: customerId, opening_time: '', closing_time: '', closed: false,
    }]);
  };

  const handleUpdateDay = (dayValue: number, deliveryHour: DeliveryHoursType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: dayValue,
          customer: deliveryHour.customer,
          opening_time: deliveryHour.opening_time,
          closing_time: deliveryHour.closing_time,
          closed: deliveryHour.closed,
        } : delivery))]);
  };

  const handleUpdateOpening = (deliveryHour: DeliveryHoursType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: deliveryHour.closed ? '' : deliveryHour.opening_time,
          closing_time: deliveryHour.closed ? '' : deliveryHour.closing_time,
          closed: !deliveryHour.closed,
        } : delivery))]);
  };

  const handleUpdateOpenHour = (openingHour: any, deliveryHour: DeliveryHoursType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: openingHour.target.value,
          closing_time: deliveryHour.closing_time,
          closed: deliveryHour.closed,
        } : delivery))]);
  };

  const handleUpdateClosedHour = (closedHour: any, deliveryHour: DeliveryHoursType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: deliveryHour.opening_time,
          closing_time: closedHour.target.value,
          closed: deliveryHour.closed,
        } : delivery))]);
  };

  const removeDeliveryHour = (deliveryHourId: number) => {
    setDeliveryHours([
      ...deliveryHours.filter(({ id }) => id !== deliveryHourId),
    ]);
  };

  
  return (
    <EditableTable
      tableTitle="Delivery hours"
      buttonTitle="Add hours"
      onAddButtonClick={addNewDeliveryHours}
    >
      {deliveryHours.map((deliveryHour, idx) => (
        <div className="flex w-full h-12 px-8 items-center even:bg-transit-grey-light" key={idx}>
          <div className="w-full pr-2">
            <Select<any>
              defaultValue={dayNumberToLabel(deliveryHour.day)}
              options={options}
              className="shadow-dateInput rounded w-full"
              placeholder={dayNumberToLabel(deliveryHour.day) ?? 'Select day'}
              onChange={(dayValue) => dayValue && handleUpdateDay(dayValue.value, deliveryHour)}
            />
          </div>
          <div className="w-full pr-2">
            <input
              type="checkbox"
              className="w-full"
              checked={deliveryHour.closed}
              onChange={() => handleUpdateOpening(deliveryHour)}
            />
          </div>
          <div className="w-full h-4/5 pr-2">
            <Input type="text" className="w-full" disabled={deliveryHour.closed} placeholder="00:00AM/PM" defaultValue={deliveryHour.opening_time} onChange={(openingHour: string) => handleUpdateOpenHour(openingHour, deliveryHour)} />
          </div>
          <div className="w-full h-4/5 pr-2">
            <Input type="text" className="w-full" disabled={deliveryHour.closed} placeholder="00:00AM/PM" defaultValue={deliveryHour.closing_time} onChange={(closedHour: string) => handleUpdateClosedHour(closedHour, deliveryHour)} />
          </div>
          <div>
            <RiDeleteBin7Line className="table-action-icons" onClick={() => removeDeliveryHour(deliveryHour.id)} />
          </div>
        </div>
      ))}
    </EditableTable>
  );
}

export default CustomerMasterDeliveryHours;
