export interface IFeatureMultivariate {
  activeValue: string;
  inactiveValue: string;
}

export interface IFeatureCondition {
  operator: string;
  prop: string;
  value: string;
}

export interface IFeature {
  name: string;
  key: string;
  active: boolean;
  multivariate?: IFeatureMultivariate;
  conditions?: Array<IFeatureCondition>,
  created?: number;
}
