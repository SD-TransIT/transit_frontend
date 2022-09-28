import { IPodVarianceDetails } from './IPodVarianceDetails';

export interface IPodVariance {
  id?: number;
  dso_type?: string;
  shipment: number;
  pod_variance_details?: IPodVarianceDetails [];
}
