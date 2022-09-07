import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/dashboard';
import ReportsPage from '../pages/reports/reports';
import ExcelUploadPage from '../pages/excelUpload/excelUpload';
import SignInPage from '../pages/signIn/SignInPage';
import LandingPage from '../pages/landing/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import CustomerTypePage from '../pages/menuUpload/CustomerTypePage';
import { Paths } from './paths';
import Forbidden from '../components/shared/Forbidden';
import Unauthorized from '../components/shared/Unauthorized';
import CostFormPage from '../pages/menuUpload/CostFormPage';
import CustomerMasterPage from '../pages/menuUpload/CustomerMasterPage';
import DriverMasterPage from '../pages/menuUpload/DriverMasterPage';
import ItemMasterPage from '../pages/menuUpload/itemMaster/ItemMasterPage';
import ItemDetailsPage from '../pages/menuUpload/ItemDetailsPage';
import ModeOfTransportMasterPage from '../pages/menuUpload/ModeOfTransportMasterPage';
import OrderDetailsPage from '../pages/menuUpload/OrderDetailsPage';
import PODVariancePage from '../pages/menuUpload/PODVariancePage';
import ShipmentPage from '../pages/menuUpload/ShipmentPage';
import SupplierMasterPage from '../pages/menuUpload/SupplierMasterPage';
import TransportDetailsPage from '../pages/menuUpload/TransportDetailsPage';
import ManualUploadPage from '../pages/menuUpload/MenuUploadPage';

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
