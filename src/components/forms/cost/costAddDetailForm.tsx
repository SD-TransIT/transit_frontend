import React, { useCallback, useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import Input from 'components/shared/inputs/input';
import { IShipment } from 'models/shipment/IShipment';
import { ITransporterDetails } from 'models/transporterDetails/ITransporterDetails';
import { getShipmentWithoutCostRequest } from 'stores/sagas/costSaga';
import { getVehiclesByTransporterRequest } from 'stores/sagas/transporterDetailsSaga';
import refreshAccessToken from 'stores/sagas/utils';

function CostAddDetailForm({
  register, transporter, setValue, getValues,
}: any) {
  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const [selectedShipments, setSelectedShipment] = useState(new Set());
  const [selectedVehicles, setSelectedVehicles] = useState(new Set());

  const handleCheckboxChange = (itemKey: any, selectedItems: any, setSelectedItems: any) => {
    const newSelectedItems = new Set(selectedItems);
    if (!newSelectedItems.has(itemKey)) {
      newSelectedItems.add(itemKey);
    } else {
      newSelectedItems.delete(itemKey);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleShipmentCheckboxChange = (itemKey: any) => {
    handleCheckboxChange(itemKey, selectedShipments, setSelectedShipment);
  };

  const handleVehicleCheckboxChange = (itemKey: any) => {
    handleCheckboxChange(itemKey, selectedVehicles, setSelectedVehicles);
  };

  const [shipments, setShipments] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = async () => {
    try {
      await refreshAccessToken();
      const response = await getVehiclesByTransporterRequest(transporter.id);
      setVehicles(response);
    } catch (error) {
      setVehicles([]);
    }
  };

  const getShipments = async () => {
    try {
      await refreshAccessToken();
      const response = await getShipmentWithoutCostRequest(transporter.id, '');
      setShipments(response);
    } catch (error) {
      setShipments([]);
    }
  };

  const resetSelectedShipment = () => {
    // reset values saved in shipment
    Object.keys(getValues()).filter(
      (result: string) => (result.includes('shipment-')),
    ).map((result: string) => {
      setValue(result, false);
      return result;
    });
  };

  const selectShipmentsByVehicle = async () => {
    resetSelectedShipment();
    try {
      await refreshAccessToken();
      if (selectedVehicles.size > 0) {
        const response = await getShipmentWithoutCostRequest(
          transporter.id,
          Array.from(selectedVehicles).toString(),
        );
        const newSelectedShipmentState = response.map((result: IShipment) => {
          setValue(`shipment-${result.id}`, true);
          return result.id;
        });
        setSelectedShipment(new Set(newSelectedShipmentState));
      } else {
        setSelectedShipment(new Set());
      }
    } catch (error) {
      setSelectedShipment(new Set());
    }
  };

  useEffect(() => {
    setSelectedShipment(new Set());
    setSelectedVehicles(new Set());
    getVehicles();
    getShipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transporter]);

  useEffect(() => {
    selectShipmentsByVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVehicles]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2 border border-transit-grey-300 p-3 max-h-80 overflow-auto">
        <p className="text-lg text-transit-black-secondary pb-2">{format('shared.vehicle_number.label')}</p>
        {vehicles.map(
          (vehicle: ITransporterDetails) => (
            <div className="flex inline-block gap-2 items-center p-2">
              <Input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(`vehicle-${vehicle.id}`)}
                name={`vehicle-${vehicle.id}`}
                type="checkbox"
                value={selectedVehicles.has(vehicle.id)}
                className="border border-transit-green-dark accent-transit-green-dark w-5 h-5 flex items-center"
                checked={selectedVehicles.has(vehicle.id)}
                onChange={() => handleVehicleCheckboxChange(vehicle.id)}
              />
              <p className="text-base text-transit-black-secondary font-medium">{vehicle.vehicle_number}</p>
            </div>
          ),
        )}
      </div>
      <div className="flex flex-col w-1/2 border border-transit-grey-300 p-3 max-h-80 overflow-auto">
        <p className="text-lg text-transit-black-secondary pb-2">{format('shared.shipment_number.label')}</p>
        {shipments.map(
          (shipment: IShipment) => (
            <div className="flex inline-block gap-2 items-center p-2">
              <Input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register(`shipment-${shipment.id}`, {
                  validate: () => selectedShipments.size > 0,
                })}
                type="checkbox"
                value={selectedShipments.has(shipment.id)}
                defaultValue={selectedShipments.has(shipment.id)}
                name={`shipment-${shipment.id}`}
                className="border border-transit-green-dark accent-transit-green-dark w-5 h-5 flex items-center"
                onChange={() => handleShipmentCheckboxChange(shipment.id)}
              />
              <p className="text-base text-transit-black-secondary font-medium">{shipment.id}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default CostAddDetailForm;
