import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Forbidden from 'components/shared/Forbidden';
import Unauthorized from 'components/shared/Unauthorized';
import DashboardPage from 'pages/dashboard/dashboard';
import ExcelUploadPage from 'pages/excelUpload/excelUpload';
import LandingPage from 'pages/landing/LandingPage';
import CostFormPage from 'pages/menuUpload/CostFormPage';
import CustomerMasterPage from 'pages/menuUpload/CustomerMasterPage';
import CustomerTypePage from 'pages/menuUpload/customerType/CustomerTypePage';
import DriverMasterPage from 'pages/menuUpload/driver/DriverMasterPage';
import ItemDetailsPage from 'pages/menuUpload/ItemDetailsPage';
import ItemMasterPage from 'pages/menuUpload/itemMaster/ItemMasterPage';
import ManualUploadPage from 'pages/menuUpload/MenuUploadPage';
import ModeOfTransportMasterPage from 'pages/menuUpload/modeOfTransport/ModeOfTransportMasterPage';
import OrderDetailsPage from 'pages/menuUpload/OrderDetailsPage';
import PODVariancePage from 'pages/menuUpload/PODVariancePage';
import AddShipmentPage from 'pages/menuUpload/shipment/AddShipmentPage';
import EditShipmentPage from 'pages/menuUpload/shipment/EditShipmentPage';
import ShipmentPage from 'pages/menuUpload/shipment/ShipmentPage';
import SupplierMasterPage from 'pages/menuUpload/supplierMaster/SupplierMasterPage';
import TransportDetailsPage from 'pages/menuUpload/TransportDetailsPage';
import ReportsPage from 'pages/reports/reports';
import SignInPage from 'pages/signIn/SignInPage';
import { Paths } from 'routes/paths';
import ProtectedRoute from 'routes/ProtectedRoute';

function RoutesConfig() {
  return (
    <Routes>
      <Route
        path={Paths.sign_in}
        element={<SignInPage />}
      />
      <Route
        path={Paths.landing}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<LandingPage />} />
        }
      />
      <Route
        path={Paths.dashboard}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<DashboardPage />} />
        }
      />
      <Route
        path={Paths.reports}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ReportsPage />} />
        }
      />
      <Route
        path={Paths.manual_upload}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ManualUploadPage />} />
        }
      />
      <Route
        path={Paths.customer_type}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<CustomerTypePage />} />
        }
      />
      <Route
        path={Paths.excel_upload}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ExcelUploadPage />} />
        }
      />
      <Route
        path={Paths.unauthorized}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<Unauthorized />} />
          }
      />
      <Route
        path={Paths.cost_form}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<CostFormPage />} />
          }
      />
      <Route
        path={Paths.customer_master}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<CustomerMasterPage />} />
          }
      />
      <Route
        path={Paths.driver_master}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<DriverMasterPage />} />
          }
      />
      <Route
        path={Paths.item_details}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ItemDetailsPage />} />
          }
      />
      <Route
        path={Paths.item_master}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ItemMasterPage />} />
          }
      />
      <Route
        path={Paths.mode_of_transport_master}
        element={(
          <ProtectedRoute
            authenticationPath={Paths.sign_in}
            outlet={<ModeOfTransportMasterPage />}
          />
        )}
      />
      <Route
        path={Paths.order_details}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<OrderDetailsPage />} />
          }
      />
      <Route
        path={Paths.pod_variance}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<PODVariancePage />} />
          }
      />
      <Route
        path={Paths.shipment_details}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<ShipmentPage />} />
          }
      />
      <Route
        path={Paths.shipment_details_add}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<AddShipmentPage />} />
          }
      />
      <Route
        path={Paths.shipment_details_edit}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<EditShipmentPage />} />
          }
      />
      <Route
        path={Paths.supplier_master}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<SupplierMasterPage />} />
          }
      />
      <Route
        path={Paths.transporter_details}
        element={
          <ProtectedRoute authenticationPath={Paths.sign_in} outlet={<TransportDetailsPage />} />
          }
      />
      <Route
        path={Paths.forbidden}
        element={<Forbidden />}
      />
    </Routes>
  );
}

export default RoutesConfig;
