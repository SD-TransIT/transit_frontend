import React, { useCallback } from 'react';

import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import DatePick from 'components/shared/DatePicker';
import SimpleSelect from 'components/shared/SimpleSelect';
import ClearButton from 'shared/buttons/ClearButton';
import SubmitButton from 'shared/buttons/SubmitButton';
import { getReportsRequest } from 'stores/actions/reports/reportsActions';
import { GetReportsRequestPayload } from 'stores/types/reports';

function RaportGenerator() {
  const {
    handleSubmit,
    reset,
    control,
  } = useForm();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const dispatch = useDispatch();

  const options = [
    { value: 'percent_capacity_utilization', label: format('report.percent_capacity_utilization.label') },
    { value: 'average_kilometers_per_shipment', label: format('report.avg_km_per_shipmen.label') },
    { value: 'average_product_cost_per_hipment', label: format('report.average_product_cost_per_shipment.label') },
    { value: 'average_transporter_cost_per_shipment', label: format('report.transporter_cost_per_shipment.label') },
    { value: 'average_transporter_cost_per_kilometer', label: format('report.transporter_cost_per_km.label') },
    { value: 'percentage_outstanding_pods', label: format('report.percentage_outstanding_pod.label') },
    { value: 'percentage_on_time_deliveries', label: format('report.percentage_otd.label') },
    { value: 'number_of_damaged_short_over_shipments', label: format('report.number_of_dso_shipments.label') },
    { value: 'average_transporter_cost_per_cubic_meter', label: format('report.avg_transporter_cost_per_cubic_meter.label') },
    { value: 'average_transporter_cost_per_each', label: format('report.avg_transporter_cost_per_each.label') },
    { value: 'average_transporter_cost_per_route', label: format('report.avg_transporter_cost_per_route.label') },
    { value: 'orders_ready_to_be_shipped', label: format('report.ready_to_be_shipped.label') },
    { value: 'discrepancy_between_invoice_and_pod', label: format('report.no_shipping_details.label') },
  ];

  const onSubmit = (formValues: FieldValues) => {
    const payload = {
      reportName: formValues.report.value,
      startDate: formValues.date_from.toJSON(),
      endDate: formValues.date_to.toJSON(),
    };
    // @ts-ignore
    dispatch(getReportsRequest(payload as GetReportsRequestPayload));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between h-9">
          <div className="flex flex-row w-4/5 gap-2">
            <div className="w-2/4 pb-3">
              <Controller
                rules={{ required: true }}
                control={control}
                render={({
                  field: {
                    onChange, ref, value,
                  },
                }) => (
                  <SimpleSelect
                    onChange={onChange}
                    ref={ref}
                    options={options}
                    placeholder={format('report.select.placeholder')}
                    value={value}
                  />
                )}
                name="report"
              />
            </div>
            <div className="w-1/4">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePick
                    currentDate={value}
                    onChange={onChange}
                  />
                )}
                name="date_from"
              />
            </div>
            <div className="w-1/4">
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePick
                    currentDate={value}
                    onChange={onChange}
                  />
                )}
                name="date_to"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <ClearButton
              onClick={() => {
                reset({
                  report: null,
                  startDate: '',
                  endDate: '',
                });
              }}
            />
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              title={format('search.generate')}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RaportGenerator;
