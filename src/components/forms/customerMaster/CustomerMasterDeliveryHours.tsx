import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { RiDeleteBin7Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import SimpleSelect from 'components/shared/SimpleSelect';
import EditableTable from 'components/shared/table/EditableTable';
import { ICustomerWeekDaysType } from 'models/customerWeekDays/ICustomerWeekDaysType';
import { RootState } from 'stores/reducers/rootReducer';
import refreshAccessToken from 'stores/sagas/utils';
import { getRequestFetchByParameters } from 'utils/apiClient';
import { timeOptionsForSelect } from 'utils/consts';
import dayNumberToLabel from 'utils/dayNumberToLabel';

type Props = {
  customerId: any,
  onDeliveryHoursChange: (deliveryHours: any) => void,
};

function CustomerMasterDeliveryHours(
  { onDeliveryHoursChange, customerId }: Props,
) {
  const [data, setData] = useState<any>();

  const isCleanupRef = useRef(false);
  const fetchIdRef = useRef(0);

  const [deliveryHours, setDeliveryHours] = useState<any[]>([]);

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const options = [
    { value: 1, label: format('day.monday.label') },
    { value: 2, label: format('day.tuesday.label') },
    { value: 3, label: format('day.wednesday.label') },
    { value: 4, label: format('day.thursday.label') },
    { value: 5, label: format('day.friday.label') },
    { value: 6, label: format('day.saturday.label') },
    { value: 7, label: format('day.sunday.label') },
  ];

  const columnHeaders = [
    { label: format('customer_master.day.label') },
    { label: format('customer_master.closed.label') },
    { label: format('customer_master.opening_time.label') },
    { label: format('customer_master.closing_time.label') },
  ];

  const {
    customerWeekDay,
  } = useSelector(
    (state: RootState) => state.customerWeekDays,
  );

  const fetchData = useCallback(async () => {
    /* eslint-disable-next-line no-plusplus */
    const fetchId = ++fetchIdRef.current;

    isCleanupRef.current = false;

    try {
      if (fetchId === fetchIdRef.current) {
        await refreshAccessToken();
        const result = await getRequestFetchByParameters('/customer_week_days/', {
          customer: customerId,
        });

        setData(result);
      }
    } catch (error) {
      setData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerWeekDay, customerId]);

  useEffect(() => {
    if (data !== undefined) {
      setDeliveryHours(data.map((currentDeliveryHour: any) => ({
        id: currentDeliveryHour.id,
        day: currentDeliveryHour.day,
        customer: currentDeliveryHour.customer,
        opening_time: currentDeliveryHour.opening_time,
        closing_time: currentDeliveryHour.closing_time,
        closed: currentDeliveryHour.closed,
      })));
    }
  }, [data, customerId]);

  useEffect(() => {
    onDeliveryHoursChange(deliveryHours);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryHours]);

  const addNewDeliveryHours = () => {
    if (customerId) {
      setDeliveryHours([...deliveryHours, {
        id: Math.floor(Math.random() * 10000), day: 1, closed: false, customer: customerId,
      }]);
    } else {
      setDeliveryHours([...deliveryHours, {
        id: Math.floor(Math.random() * 10000), day: 1, closed: false,
      }]);
    }
  };

  const handleUpdateDay = (dayValue: number, deliveryHour: ICustomerWeekDaysType) => {
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

  const handleUpdateOpening = (deliveryHour: ICustomerWeekDaysType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: deliveryHour.opening_time,
          closing_time: deliveryHour.closing_time,
          closed: !deliveryHour.closed,
        } : delivery))]);
  };

  const handleUpdateOpenHour = (openingHour: any, deliveryHour: ICustomerWeekDaysType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: openingHour,
          closing_time: deliveryHour.closing_time,
          closed: deliveryHour.closed,
        } : delivery))]);
  };

  const handleUpdateClosedHour = (closedHour: any, deliveryHour: ICustomerWeekDaysType) => {
    setDeliveryHours([
      ...deliveryHours.map((delivery) => (delivery.id === deliveryHour.id
        ? {
          id: deliveryHour.id,
          day: deliveryHour.day,
          customer: deliveryHour.customer,
          opening_time: deliveryHour.opening_time,
          closing_time: closedHour,
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
      tableTitle={format('customer_master.delivery_hours.header')}
      buttonTitle={format('app.add_hours')}
      onAddButtonClick={addNewDeliveryHours}
      columnHeaders={columnHeaders}
    >
      {deliveryHours.map((deliveryHour) => (
        <div className="flex pl-4 py-2 even:bg-transit-grey-light" key={deliveryHour.id}>
          <div className="flex flex-row w-full">
            <div className="w-1/4 pr-4">
              <SimpleSelect
                options={options}
                onChange={(dayValue) => dayValue && handleUpdateDay(dayValue.value, deliveryHour)}
                placeholder={format(dayNumberToLabel(deliveryHour.day)) ?? format('app.select_day.label')}
              />
            </div>
            <div className="flex w-1/4 h-full items-center">
              <input
                type="checkbox"
                checked={deliveryHour.closed}
                onChange={() => handleUpdateOpening(deliveryHour)}
                className="w-full h-5 border border-transit-green-dark accent-transit-green-dark"
              />
            </div>
            <div className="w-1/4 h-4/5 pr-4">
              <SimpleSelect
                options={timeOptionsForSelect}
                onChange={(openingHour) => openingHour
                && handleUpdateOpenHour(openingHour.value, deliveryHour)}
                placeholder={deliveryHour.closed ? '' : deliveryHour.opening_time}
                isDisabled={deliveryHour.closed}
              />
            </div>
            <div className="w-1/4 h-4/5 pr-4">
              <SimpleSelect
                options={timeOptionsForSelect}
                onChange={(closedHour) => closedHour
                && handleUpdateClosedHour(closedHour.value, deliveryHour)}
                placeholder={deliveryHour.closed ? '' : deliveryHour.closing_time}
                isDisabled={deliveryHour.closed}
              />
            </div>
          </div>
          <div className="w-fit pr-4">
            <RiDeleteBin7Line className="table-action-icons" onClick={() => removeDeliveryHour(deliveryHour.id)} />
          </div>
        </div>
      ))}
    </EditableTable>
  );
}

export default CustomerMasterDeliveryHours;
