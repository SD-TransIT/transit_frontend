export const DEFAULT_OFFSET = 10;
export const FIRST_PAGE = 1;
export const EMPTY_SEARCHER = '';

export const timeOptionsForSelect = [
  { value: '00:00AM', label: '00:00AM' },
  { value: '00:30AM', label: '00:30AM' },
  { value: '01:00AM', label: '01:00AM' },
  { value: '01:30AM', label: '01:30AM' },
  { value: '02:00AM', label: '02:00AM' },
  { value: '02:30AM', label: '02:30AM' },
  { value: '03:00AM', label: '03:00AM' },
  { value: '03:30AM', label: '03:30AM' },
  { value: '04:00AM', label: '04:00AM' },
  { value: '04:30AM', label: '04:30AM' },
  { value: '05:00AM', label: '05:00AM' },
  { value: '05:30AM', label: '05:30AM' },
  { value: '06:00AM', label: '06:00AM' },
  { value: '06:30AM', label: '06:30AM' },
  { value: '07:00AM', label: '07:00AM' },
  { value: '07:30AM', label: '07:30AM' },
  { value: '08:00AM', label: '08:00AM' },
  { value: '08:30AM', label: '08:30AM' },
  { value: '09:00AM', label: '09:00AM' },
  { value: '09:30AM', label: '09:30AM' },
  { value: '10:00AM', label: '10:00AM' },
  { value: '10:30AM', label: '10:30AM' },
  { value: '11:00AM', label: '11:00AM' },
  { value: '11:30AM', label: '11:30AM' },
  { value: '12:00AM', label: '12:00AM' },
  { value: '12:30AM', label: '12:30AM' },
  { value: '01:00PM', label: '01:00PM' },
  { value: '01:30PM', label: '01:30PM' },
  { value: '02:00PM', label: '02:00PM' },
  { value: '02:30PM', label: '02:30PM' },
  { value: '03:00PM', label: '03:00PM' },
  { value: '03:30PM', label: '03:30PM' },
  { value: '04:00PM', label: '04:00PM' },
  { value: '04:30PM', label: '04:30PM' },
  { value: '05:00PM', label: '05:00PM' },
  { value: '05:30PM', label: '05:30PM' },
  { value: '06:00PM', label: '06:00PM' },
  { value: '06:30PM', label: '06:30PM' },
  { value: '07:00PM', label: '07:00PM' },
  { value: '07:30PM', label: '07:30PM' },
  { value: '08:00PM', label: '08:00PM' },
  { value: '08:30PM', label: '08:30PM' },
  { value: '09:00PM', label: '09:00PM' },
  { value: '09:30PM', label: '09:30PM' },
  { value: '10:00PM', label: '10:00PM' },
  { value: '10:30PM', label: '10:30PM' },
  { value: '11:00PM', label: '11:00PM' },
  { value: '11:30PM', label: '11:30PM' },
];

export const percentCapacityUtilizationColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'shipment.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_vehicle_volume.label', accessor: 'VehicleCapacityVolume' },
  { label: 'report.total_vehicle_volume_used.label', accessor: 'volume' },
  { label: 'report.percent_utilization.label', accessor: 'PercentUtilization' },
];

export const averageKilometersPerShipmentColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'shipment.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_km.label', accessor: '' },
  { label: 'report.total_number_of_shipment.label', accessor: '' },
  { label: 'report.avg_km_per_shipment.label', accessor: '' },
];

export const averageProductCostPerShipmentColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'shipment.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_product_cost.label', accessor: '' },
  { label: 'report.total_number_of_shipment.label', accessor: '' },
  { label: 'report.avg_product_cost_per_shipment.label', accessor: '' },
];

export const averageTransporterCostPerShipmentColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'shipment.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_transporter_cost.label', accessor: '' },
  { label: 'report.total_number_of_shipment.label', accessor: '' },
  { label: 'report.avg_transporter_cost_per_shipment.label', accessor: '' },
];

export const averageTransporterCostPerKilometerColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_id.label', accessor: '' },
  { label: 'report.total_transporter_cost.label', accessor: '' },
  { label: 'report.total_number_of_km.label', accessor: '' },
  { label: 'report.avg_transporter_cost_per_km.label', accessor: '' },
];

export const percentageOutstandingPodsColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_number_of_outstanding_pods.label', accessor: '' },
  { label: 'report.total_pods.label', accessor: '' },
  { label: 'report.percentage_of_outstanding_pods.label', accessor: '' },
];

export const percentageOnTimeDeliveriesColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_number_of_shipment.label', accessor: '' },
  { label: 'report.total_number_of_ontime_deliveries.label', accessor: '' },
  { label: 'report.percentage_ontime_deliveries.label', accessor: '' },
  { label: 'report.total_number_of_delayed_deliveries.label', accessor: '' },
  { label: 'report.percentage_delay_deliveries.label', accessor: '' },
];

export const numberOfDamagedShortOverShipmentsColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_number.label', accessor: 'CustomRouteNumber' },
  { label: 'report.dso_type.label', accessor: '' },
  { label: 'report.old_quantity.label', accessor: '' },
  { label: 'pod_variance.order.quantity.new.label', accessor: '' },
];

export const averageTransporterCostPerCubicMeterColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_id.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_shipment_value.label', accessor: '' },
  { label: 'report.total_transporter_cost.label', accessor: '' },
  { label: 'report.avg_transporter_cost_per_cubic_meter.label', accessor: '' },
];

export const averageTransporterCostPerEachColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.custom_route_id.label', accessor: 'CustomRouteNumber' },
  { label: 'report.total_number_of_eaches.label', accessor: '' },
  { label: 'report.total_transporter_cost.label', accessor: '' },
  { label: 'report.avg_transporter_cost_per_each.label', accessor: '' },
];

export const averageTransporterCostPerRouteColumns = [
  { label: 'app.date.label', accessor: 'ShipDate' },
  { label: 'shipment.transporter_name.label', accessor: 'TransporterName' },
  { label: 'shipment.vehicle_number.label', accessor: 'VehicleNumber' },
  { label: 'report.total_number_of_custom_routes.label', accessor: '' },
  { label: 'report.total_transporter_cost.label', accessor: '' },
  { label: 'report.avg_transporter_cost_per_route.label', accessor: '' },
];

export const ordersReadyToBeShippedColumns = [
  { label: 'cost.shipment_number.label', accessor: '' },
  { label: 'pod_variance.order.order_number.label', accessor: '' },
  { label: 'customer_type.column.name', accessor: '' },
  { label: 'customer_master.address_1.label', accessor: 'CustomRouteNumber' },
  { label: 'customer_master.address_2.label', accessor: '' },
  { label: 'customer_master.address_3.label', accessor: '' },
  { label: 'customer_master.city.label', accessor: '' },
  { label: 'customer_master.state.label', accessor: '' },
  { label: 'customer_master.country.label', accessor: '' },
];

export const discrepancyBetweenInvoiceAndPodColumns = [
  { label: 'cost.shipment_number.label', accessor: '' },
  { label: 'report.shipment_volume.label', accessor: '' },
];
