import React, { useCallback } from 'react';

import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import ClearButton from 'components/shared/buttons/ClearButton';
import SubmitButton from 'components/shared/buttons/SubmitButton';
import DatePick from 'components/shared/DatePicker';
import SimpleSelect from 'components/shared/SimpleSelect';
import ValidationError from 'components/shared/ValidationError';
import { getReportsRequest } from 'stores/actions/reports/reportsActions';
import { GetReportsRequestPayload } from 'stores/types/reports';

import { ReportGeneratorType } from './types';

function RaportGenerator({ currentReport }: ReportGeneratorType) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { formatMessage } = useIntl();
  const format = useCallback((id: string, values: any = '') => formatMessage({ id }, values), [formatMessage]);

  const dispatch = useDispatch();

  const options = [
    { value: 'percent_capacity_utilization', label: format('report.percent_capacity_utilization.label') },
    { value: 'average_kilometers_per_shipment', label: format('report.avg_km_per_shipmen.label') },
    { value: 'average_product_cost_per_shipment', label: format('report.average_product_cost_per_shipment.label') },
    { value: 'average_transporter_cost_per_shipment', label: format('report.transporter_cost_per_shipment.label') },
    { value: 'average_transporter_cost_per_kilometer', label: format('report.transporter_cost_per_km.label') },
    { value: 'percentage_outstanding_pods', label: format('report.percentage_outstanding_pod.label') },
    { value: 'percentage_on_time_deliveries', label: format('report.percentage_otd.label') },
    { value: 'number_of_damaged_short_over_shipments', label: format('report.number_of_dso_shipments.label') },
    { value: 'average_transporter_cost_per_cubic_meter', label: format('report.avg_transporter_cost_per_cubic_meter.label') },
    { value: 'average_transporter_cost_per_each', label: format('report.avg_transporter_cost_per_each.label') },
    { value: 'average_transporter_cost_per_route', label: format('report.avg_transporter_cost_per_route.label') },
    { value: 'orders_ready_to_be_shipped', label: format('report.ready_to_be_shipped.label') },
    { value: 'orders_with_no_shipping_details', label: format('report.no_shipping_details.label') },
  ];

  const onSubmit = (formValues: FieldValues) => {
    const payload: GetReportsRequestPayload = {
      reportName: formValues.report.value,
      startDate: formValues.date_from.toJSON(),
      endDate: formValues.date_to.toJSON(),
    };

    dispatch(getReportsRequest(payload as GetReportsRequestPayload));
    currentReport(formValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between h-9">
          <div className="flex flex-row w-4/5 gap-3">
            <div className="w-2/4 h-full">
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
                    isInvalid={Boolean(errors.report)}
                  />
                )}
                name="report"
              />
              {errors.report && <ValidationError value={format('validation.error.field_required')} />}
            </div>
            <div className="w-1/4">
              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePick
                    currentDate={value}
                    onChange={onChange}
                    isInvalid={Boolean(errors.date_from)}
                  />
                )}
                name="date_from"
              />
              {errors.date_from && <ValidationError value={format('validation.error.field_required')} />}
            </div>
            <div className="w-1/4">
              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePick
                    currentDate={value}
                    onChange={onChange}
                    isInvalid={Boolean(errors.date_to)}
                  />
                )}
                name="date_to"
              />
              {errors.date_to && <ValidationError value={format('validation.error.field_required')} />}
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
