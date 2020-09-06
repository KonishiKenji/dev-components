/**
 * 利用者情報: サービス利用詳細
 */

import ValidationErrors from "@interfaces/ui/validationErrors";
import {
  InputValue,
  SelectValue,
  RadioButtonValue,
  SwitchValue,
  SelectDateValue
} from "@interfaces/ui/form";

interface Base<T> {
  serviceUse: T;
}

interface Fields {
  facilityUnitId: SelectValue;
  inServiceStartDate: SelectDateValue;
  inServiceEndDate: SelectDateValue;
  payStartDate: SelectDateValue;
  payEndDate: SelectDateValue;
  disabilityClass: RadioButtonValue;
  regionalTransferForStrongBehaviorType: RadioButtonValue;
  mentalDisorderSupportType: RadioButtonValue;
  incomeKind: RadioButtonValue;
  incomeKindType: SelectValue;
  specifiedPersonsDisabilitiesBenefits: InputValue;
  subsidizedFlag: SwitchValue;
  subsidizedPercent: InputValue;
  subsidizedYen: InputValue;
  subsidizedUnit: SelectValue;
  subsidizedCityId: SelectValue;
  upperLimitFacilityFlag: SwitchValue;
  upperLimitControlledBy: SelectValue;
  upperLimitFacilityNumber: InputValue;
  upperLimitFacilityName: InputValue;
  upperLimitTotalYen: InputValue;
  upperLimitUserLoadYen: InputValue;
  resultOfManagement: RadioButtonValue;
  upperLimitYen: InputValue;
  createSupportPlanFlag: SwitchValue;
  notCreateSupportPlanStartDate: SelectDateValue;
}

type Errors = ValidationErrors<Fields>;

export type ServiceUseValues = Base<Fields>;
export type ServiceUseErrors = Base<Errors>;
