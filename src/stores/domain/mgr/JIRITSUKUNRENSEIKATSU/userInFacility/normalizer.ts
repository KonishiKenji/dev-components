import { UsersInFacilityState } from "./types";
import { GetFacilityUserTargetIdResponse } from "@api/requests/facility/getFacilityUserTargetId";
import { UsersValues } from "@initialize/mgr/JIRITSUKUNRENSEIKATSU/users/initialValues";
import { Checkbox } from "@constants/variables";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import { FacilityState } from "../../JIRITSUKUNRENSEIKATSU/facility/types";
import { isEmpty } from "lodash";

/**
 * Normalized Type
 */
export type NormalizedGetFacilityUserTargetIdResponse = UsersInFacilityState["user"];

/**
 * APIのデータをフォームの形式に成形
 * @param result resultの型がanyである理由は、APIの型がCheckboxのため
 */
export const normalizedGetFacilityUserTargetIdResponse = (
  result: any
): NormalizedGetFacilityUserTargetIdResponse => {
  const userInFacility = result.user_in_facility;
  const userInFacilityJIRITSUKUNRENSEIKATSU =
    result.user_in_facility_jiritsukunren_seikatsu;
  const normalized = {
    user_in_facility: {
      ...userInFacility,
      none_recipient_number_flg: castNumberCheckboxValue(
        userInFacility.none_recipient_number_flg
      ),
      classify_physical_flg: castStringCheckboxValue(
        userInFacility.classify_physical_flg
      ),
      classify_intelligence_flg: castStringCheckboxValue(
        userInFacility.classify_intelligence_flg
      ),
      classify_mind_flg: castStringCheckboxValue(
        userInFacility.classify_mind_flg
      ),
      classify_growth_flg: castStringCheckboxValue(
        userInFacility.classify_growth_flg
      ),
      classify_brain_flg: castStringCheckboxValue(
        userInFacility.classify_brain_flg
      ),
      classify_incurable_flg: castStringCheckboxValue(
        userInFacility.classify_incurable_flg
      ),
      classify_handicapped_flg: castStringCheckboxValue(
        userInFacility.classify_handicapped_flg
      ),
      uplimit_controlled_by: userInFacility.uplimit_controlled_by || "1",
      uplimit_facility_flg: castStringCheckboxValue(
        userInFacility.uplimit_facility_flg
      ),
      uplimit_total_yen: castStringOrNull(userInFacility.uplimit_total_yen),
      uplimit_user_load_yen: castStringOrNull(
        userInFacility.uplimit_user_load_yen
      ),
      result_of_management: userInFacility.result_of_management || "1",
      uplimit_yen: castString(userInFacility.uplimit_yen),
      create_support_plan_flg: castStringCheckboxValue(
        userInFacility.create_support_plan_flg
      ),
      def_food: castStringOrNull(userInFacility.def_food),
      def_pickup: castStringOrNull(userInFacility.def_pickup),
      pickup_premises: castString(userInFacility.pickup_premises),
      user_charge_limit_flg: castNumberCheckboxValue(
        userInFacility.user_charge_limit_flg
      ),
      food_serve_addition_flg: castNumberCheckboxValue(
        userInFacility.food_serve_addition_flg
      ),
      care_support_payment_flg: castNumberCheckboxValue(
        userInFacility.care_support_payment_flg
      ),
      care_support_auth_flg: castNumberCheckboxValue(
        userInFacility.care_support_auth_flg
      ),
      plan_support_payment_flg: castNumberCheckboxValue(
        userInFacility.plan_support_payment_flg
      ),
      plan_support_monitor_flg: castNumberCheckboxValue(
        userInFacility.plan_support_monitor_flg
      )
    },
    user_in_facility_jiritsukunren_seikatsu: {
      ...userInFacilityJIRITSUKUNRENSEIKATSU
    }
  };
  return normalized;
};

/**
 * フォームの結果をAPIに送れる形式に整形
 */
export const normalizeFormValue = (
  values: UsersValues,
  facility: FacilityState,
  params?: GetFacilityUserTargetIdResponse["data"]
): UserInFacilityResult => {
  const target: UserInFacilityResult = {
    user_in_facility: {
      id: params ? params.user_in_facility.id : undefined,
      facility_id: params ? params.user_in_facility.facility_id : undefined,

      /* 基本情報 */
      name_sei: values.basic.nameSei,
      name_mei: values.basic.nameMei,
      name_sei_kana: values.basic.nameSeiKana,
      name_mei_kana: values.basic.nameMeiKana,
      recipient_number: isEmpty(values.basic.recipientNumber)
        ? null
        : values.basic.recipientNumber,
      none_recipient_number_flg: booleanToNumber0or1(
        values.basic.noneRecipientNumberFlag
      ),
      gender: values.basic.gender,
      classify_physical_flg: booleanToString0or1(
        values.basic.classifyPhysicalFlag
      ),
      classify_intelligence_flg: booleanToString0or1(
        values.basic.classifyIntelligenceFlag
      ),
      classify_mind_flg: booleanToString0or1(values.basic.classifyMindFlag),
      classify_growth_flg: booleanToString0or1(values.basic.classifyGrowthFlag),
      classify_brain_flg: booleanToString0or1(values.basic.classifyBrainFlag),
      classify_incurable_flg: booleanToString0or1(
        values.basic.classifyIncurableFlag
      ),
      classify_handicapped_flg: booleanToString0or1(
        values.basic.classifyHandicappedFlag
      ),
      date_birth: selectDateValueToDatePaddingZero(values.basic.dateOfBirth),
      postal_code: values.basic.postalCode,
      prefecture_name: values.basic.prefectureId,
      city_id: stringToNumber(values.basic.cityId),
      address: values.basic.restAddress,
      tel: isEmpty(values.basic.tel) ? null : values.basic.tel,
      email: isEmpty(values.basic.email) ? null : values.basic.email,
      guardian_name: isEmpty(values.basic.guardianName)
        ? null
        : values.basic.guardianName,
      guardian_relation: isEmpty(values.basic.guardianRelation)
        ? null
        : values.basic.guardianRelation,
      guardian_tel: isEmpty(values.basic.guardianTel)
        ? null
        : values.basic.guardianTel,
      memo: isEmpty(values.basic.memo) ? null : values.basic.memo,

      /* サービス詳細 */
      date_begin_in_service: selectDateValueToDatePaddingZero(
        values.serviceUse.inServiceStartDate
      ),
      date_end_in_service: selectDateValueToDatePaddingZero(
        values.serviceUse.inServiceEndDate
      ),
      date_pay_begin: selectDateValueToDatePaddingZero(
        values.serviceUse.payStartDate
      ),
      date_pay_end: selectDateValueToDatePaddingZero(
        values.serviceUse.payEndDate
      ),
      agreed_by_contract_flg: values.serviceUse.agreedByContractFlg,
      pay_days_agreed: values.serviceUse.payDaysAgreed,
      business_number_contract: values.serviceUse.businessNumberContract,
      income_kind: values.serviceUse.incomeKind,
      uplimit_facility_flg: booleanToString0or1(
        values.serviceUse.upperLimitFacilityFlag
      ),
      uplimit_controlled_by: values.serviceUse.upperLimitControlledBy,
      uplimit_facility_number: values.serviceUse.upperLimitFacilityNumber,
      uplimit_facility_name: values.serviceUse.upperLimitFacilityName,
      uplimit_total_yen: isEmpty(values.serviceUse.upperLimitTotalYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitTotalYen),
      uplimit_user_load_yen: isEmpty(values.serviceUse.upperLimitUserLoadYen)
        ? null
        : stringToNumber(values.serviceUse.upperLimitUserLoadYen),
      result_of_management: values.serviceUse.resultOfManagement,
      uplimit_yen: stringToNumber(values.serviceUse.upperLimitYen),
      create_support_plan_flg: values.serviceUse.createSupportPlanFlag
        ? Checkbox.OFF
        : Checkbox.ON,
      date_start_not_create_support_plan: selectDateValueToDatePaddingZero(
        values.serviceUse.notCreateSupportPlanStartDate
      ),
      def_food: values.serviceUse.defFood,
      def_pickup: values.serviceUse.defPickup,
      pickup_premises: values.serviceUse.pickupPremises,

      /* 受給者証 */
      user_charge_limit_flg: booleanToNumber0or1(
        values.recipientCertificate.userChargeLimitFlag
      ),
      date_begin_user_charge_limit: selectDateValueToDatePaddingZero(
        values.recipientCertificate.userChargeLimitStartDate
      ),
      date_end_user_charge_limit: selectDateValueToDatePaddingZero(
        values.recipientCertificate.userChargeLimitEndDate
      ),
      food_serve_addition_flg: booleanToNumber0or1(
        values.recipientCertificate.foodServeAdditionFlg
      ),
      date_begin_food_serve_addition: selectDateValueToDatePaddingZero(
        values.recipientCertificate.foodServeAdditionStartDate
      ),
      date_end_food_serve_addition: selectDateValueToDatePaddingZero(
        values.recipientCertificate.foodServeAdditionEndDate
      ),
      care_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportPaymentFlag
      ),
      date_begin_care_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportPaymentStartDate
      ),
      date_end_care_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportPaymentEndDate
      ),
      care_support_auth_flg: booleanToNumber0or1(
        values.recipientCertificate.careSupportAuthFlag
      ),
      date_begin_care_support_auth: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportAuthStartDate
      ),
      date_end_care_support_auth: selectDateValueToDatePaddingZero(
        values.recipientCertificate.careSupportAuthEndDate
      ),
      plan_support_payment_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportPaymentFlag
      ),
      date_begin_plan_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportPaymentStartDate
      ),
      date_end_plan_support_payment: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportPaymentEndDate
      ),
      plan_support_monitor_flg: booleanToNumber0or1(
        values.recipientCertificate.planSupportMonitorFlag
      ),
      date_begin_plan_support_monitor: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportMonitorStartDate
      ),
      date_end_plan_support_monitor: selectDateValueToDatePaddingZero(
        values.recipientCertificate.planSupportMonitorEndDate
      )
    },
    user_in_facility_jiritsukunren_seikatsu: {
      users_in_facility_id:
        params && params.user_in_facility_jiritsukunren_seikatsu
          ? params.user_in_facility_jiritsukunren_seikatsu.users_in_facility_id
          : undefined,
      disability_class: stringToNumber(values.serviceUse.disabilityClass),
      income_kind: stringToNumber(values.serviceUse.incomeKindType),
      blindness_flg: booleanToNumber0or1(values.serviceUse.blindnessFlg),
      individual_training_implementation_plan_flg: booleanToNumber0or1(
        values.serviceUse.individualTrainingImplementationPlanFlg
      ),
      social_life_support_flg: booleanToNumber0or1(
        values.serviceUse.socialLifeSupportFlg
      )
    }
  };

  const normalized: UserInFacilityResult = resultFormat(target, facility);
  let postValue = null;
  // 更新の場合は差分抽出のメソッドへ
  if (params) {
    const targetParm = removeNoChangeData(params, normalized, facility);
    postValue = removeNullParam(targetParm);
  }
  // 新規の場合はオブジェクト送信判定のメソッドへ
  else {
    postValue = normalized;
  }

  return postValue;
};

/**
 * 差分抽出のメソッド
 */
const removeNoChangeData = (
  apiValues: GetFacilityUserTargetIdResponse["data"],
  formValues: UserInFacilityResult,
  facility: FacilityState
): UserInFacilityResult => {
  const target = {
    user_in_facility: {
      id: formValues.user_in_facility.id,
      facility_id: formValues.user_in_facility.facility_id,
      name_sei: undefined,
      name_mei: undefined,
      name_sei_kana: undefined,
      name_mei_kana: undefined,
      recipient_number: undefined,
      none_recipient_number_flg: undefined,
      gender: undefined,
      classify_physical_flg: undefined,
      classify_intelligence_flg: undefined,
      classify_mind_flg: undefined,
      classify_growth_flg: undefined,
      classify_brain_flg: undefined,
      classify_incurable_flg: undefined,
      classify_handicapped_flg: undefined,
      date_birth: formValues.user_in_facility.date_birth,
      postal_code: undefined,
      prefecture_name: undefined,
      city_id: undefined,
      address: undefined,
      tel: undefined,
      email: undefined,
      guardian_name: undefined,
      guardian_relation: undefined,
      guardian_tel: undefined,
      memo: undefined,

      /* サービス詳細 */
      date_begin_in_service: formValues.user_in_facility.date_begin_in_service,
      date_end_in_service: undefined,
      date_pay_begin: formValues.user_in_facility.date_pay_begin,
      date_pay_end: formValues.user_in_facility.date_pay_end,
      agreed_by_contract_flg: undefined,
      pay_days_agreed: undefined,
      business_number_contract: undefined,
      income_kind: formValues.user_in_facility.income_kind,
      uplimit_facility_flg: undefined,
      uplimit_controlled_by: undefined,
      uplimit_facility_number: undefined,
      uplimit_facility_name: undefined,
      uplimit_total_yen: undefined,
      uplimit_user_load_yen: undefined,
      result_of_management: undefined,
      uplimit_yen: undefined,
      create_support_plan_flg: undefined,
      date_start_not_create_support_plan:
        formValues.user_in_facility.create_support_plan_flg === "0"
          ? formValues.user_in_facility.date_start_not_create_support_plan
          : undefined,
      def_food: undefined,
      def_pickup: undefined,
      pickup_premises: undefined,

      /* 受給者証 */
      user_charge_limit_flg: undefined,
      date_begin_user_charge_limit: undefined,
      date_end_user_charge_limit: undefined,
      food_serve_addition_flg: undefined,
      date_begin_food_serve_addition: undefined,
      date_end_food_serve_addition: undefined,
      care_support_payment_flg: undefined,
      date_begin_care_support_payment: undefined,
      date_end_care_support_payment: undefined,
      care_support_auth_flg: undefined,
      date_begin_care_support_auth: undefined,
      date_end_care_support_auth: undefined,
      plan_support_payment_flg: undefined,
      date_begin_plan_support_payment: undefined,
      date_end_plan_support_payment: undefined,
      plan_support_monitor_flg: undefined,
      date_begin_plan_support_monitor: undefined,
      date_end_plan_support_monitor: undefined
    },
    user_in_facility_jiritsukunren_seikatsu: {
      users_in_facility_id:
        formValues.user_in_facility_jiritsukunren_seikatsu.users_in_facility_id,
      disability_class:
        formValues.user_in_facility_jiritsukunren_seikatsu.disability_class,
      income_kind:
        formValues.user_in_facility_jiritsukunren_seikatsu.income_kind,
      blindness_flg:
        formValues.user_in_facility_jiritsukunren_seikatsu.blindness_flg,
      individual_training_implementation_plan_flg:
        formValues.user_in_facility_jiritsukunren_seikatsu
          .individual_training_implementation_plan_flg,
      social_life_support_flg:
        formValues.user_in_facility_jiritsukunren_seikatsu
          .social_life_support_flg
    }
  };

  const apiValue = apiParamFormat(apiValues, facility);
  const form = formValues.user_in_facility;
  // サービス提供終了日のみAPIの型と合わないため
  form.date_end_in_service =
    form.date_end_in_service === "" ? null : form.date_end_in_service;
  // 差分の項目を抽出 必須項目は除く
  Object.keys(target).forEach(key => {
    Object.keys(target[key]).forEach(param => {
      if (target[key][param] === undefined) {
        `${apiValue[key][param]}` !== `${formValues[key][param]}`
          ? (target[key][param] = formValues[key][param])
          : (target[key][param] = undefined);
      }
    });
  });

  const diffDate = addParentValue(target, formValues);
  // 特殊項目の差分比較
  // 上限管理事業所ありの項目に変更があったら
  // 事業所番号と事業所名は入力値を送信する
  if (diffDate.user_in_facility.uplimit_facility_flg === "1") {
    diffDate.user_in_facility.uplimit_facility_number =
      formValues.user_in_facility.uplimit_facility_number;
    diffDate.user_in_facility.uplimit_facility_name =
      formValues.user_in_facility.uplimit_facility_name;
  }
  return diffDate;
};

/**
 * 子要素の差分判定　子要素に差分がある場合、親要素もパラメータに付与する
 * @param target
 * @param after
 */
const addParentValue = (
  target: UserInFacilityResult,
  after: UserInFacilityResult
): UserInFacilityResult => {
  Object.keys(parentParamsMap).forEach(uifKey => {
    Object.keys(parentParamsMap[uifKey]).forEach(paramKey => {
      const childKeys = parentParamsMap[uifKey][paramKey].childKeys
        ? parentParamsMap[uifKey][paramKey].childKeys
        : [];
      const isDiffChildren: boolean = childKeys.some((childKey: string) => {
        return target[uifKey][childKey] !== undefined;
      });
      if (isDiffChildren) {
        target[uifKey][parentParamsMap[uifKey][paramKey].key] =
          after[uifKey][parentParamsMap[uifKey][paramKey].key];
      }
    });
  });
  return target;
};

/**
 * パラメータ内のundefindはパラメータから除外する
 * @param data
 */
const removeNullParam = (data: UserInFacilityResult): UserInFacilityResult => {
  const targetParm: UserInFacilityResult = {
    user_in_facility: {},
    user_in_facility_jiritsukunren_seikatsu: {}
  };
  // 引数のデータからuser_in_facilityとuser_in_facility_jiritsukunren_seikatsuを取得
  Object.keys(data).forEach(key => {
    // user_in_facilityとuser_in_facility_jiritsukunren_seikatsuからparamを取得
    Object.keys(data[key]).forEach(param => {
      if (data[key][param] !== undefined) {
        targetParm[key][param] = data[key][param];
      }
    });
  });

  return targetParm;
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

/**
 * stringの時だけnumberに変換
 * 空の場合はnullを返す
 */
const stringToNumberOrNull = (value?: string): number | null => {
  return isEmpty(value) ? null : Number(value);
};

/**
 * boolean => "0" or "1"
 */
const booleanToString0or1 = (value?: boolean): string | undefined => {
  return value !== undefined ? `${+value}` : value;
};

/**
 * boolean => 0 or 1
 */
const booleanToNumber0or1 = (value?: boolean): number | undefined => {
  return value !== undefined ? +value : value;
};

const CheckboxValueToNumber0or1 = (value?: Checkbox): number | undefined => {
  return value === Checkbox.OFF ? 0 : 1;
};

const castNumberCheckboxValue = (value?: number | null | undefined) => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === 1 ? Checkbox.ON : Checkbox.OFF;
};

const castStringCheckboxValue = (value?: string | null | undefined) => {
  if (!value) {
    return Checkbox.OFF;
  }
  return value === "1" ? Checkbox.ON : Checkbox.OFF;
};

const castString = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return value.toString();
};

const castStringOrNull = (value?: number | null | undefined) => {
  if (value === undefined || value === null) {
    return null;
  }
  return value.toString();
};

/**
 * apiのparamが画面に表示する際にデフォルト値に変換されてしまっているため
 * 差分比較のために変換前に戻すメソッド
 * @param target
 */
const apiParamFormat = (
  apiParamValue: GetFacilityUserTargetIdResponse["data"],
  facility: FacilityState
) => {
  const result: UserInFacilityResult = normalizeApiValue(apiParamValue);

  if (result.user_in_facility.uplimit_facility_flg === Checkbox.OFF) {
    result.user_in_facility.uplimit_facility_name = null;
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
    result.user_in_facility.uplimit_yen = null;
    result.user_in_facility.result_of_management = null;
  }
  if (result.user_in_facility.uplimit_controlled_by === "2") {
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
  }
  if (result.user_in_facility.result_of_management !== "3") {
    result.user_in_facility.uplimit_yen = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
  }
  return result;
};

/**
 * 差分比較のために
 * APIのパラメータをフォームの形式に整形
 */
export const normalizeApiValue = (
  params: GetFacilityUserTargetIdResponse["data"]
): UserInFacilityResult => {
  const apiValue: UserInFacilityResult = {
    user_in_facility: {
      ...params.user_in_facility,
      none_recipient_number_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.none_recipient_number_flg
      ),
      uplimit_total_yen: stringToNumberOrNull(
        params.user_in_facility.uplimit_total_yen
      ),
      uplimit_yen: stringToNumberOrNull(params.user_in_facility.uplimit_yen),
      uplimit_user_load_yen: stringToNumberOrNull(
        params.user_in_facility.uplimit_user_load_yen
      ),
      user_charge_limit_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.user_charge_limit_flg
      ),
      food_serve_addition_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.food_serve_addition_flg
      ),
      care_support_payment_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.care_support_payment_flg
      ),
      care_support_auth_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.care_support_auth_flg
      ),
      plan_support_payment_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.plan_support_payment_flg
      ),
      plan_support_monitor_flg: CheckboxValueToNumber0or1(
        params.user_in_facility.plan_support_monitor_flg
      )
    },
    user_in_facility_jiritsukunren_seikatsu: {
      ...params.user_in_facility_jiritsukunren_seikatsu
    }
  };
  return apiValue;
};

/**
 * 特定のフラグがOFFの場合、APIに送信する項目を削除する
 * @param target
 */
const resultFormat = (
  target: UserInFacilityResult,
  facility: FacilityState
) => {
  const result = {
    user_in_facility: { ...target.user_in_facility },
    user_in_facility_jiritsukunren_seikatsu: {
      ...target.user_in_facility_jiritsukunren_seikatsu
    }
  };

  if (result.user_in_facility.income_kind !== "1") {
    result.user_in_facility_jiritsukunren_seikatsu.income_kind = 0;
  }
  if (result.user_in_facility.agreed_by_contract_flg === "1") {
    result.user_in_facility.pay_days_agreed = null;
    result.user_in_facility.business_number_contract = null;
  }
  if (result.user_in_facility.uplimit_controlled_by === "2") {
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
  }
  if (result.user_in_facility.result_of_management !== "3") {
    result.user_in_facility.uplimit_yen = null;
  }
  if (result.user_in_facility.uplimit_facility_flg === Checkbox.OFF) {
    result.user_in_facility.uplimit_facility_name = null;
    result.user_in_facility.uplimit_controlled_by = null;
    result.user_in_facility.uplimit_facility_number = null;
    result.user_in_facility.uplimit_total_yen = null;
    result.user_in_facility.uplimit_user_load_yen = null;
    result.user_in_facility.uplimit_yen = null;
    result.user_in_facility.result_of_management = null;
  }
  if (result.user_in_facility.create_support_plan_flg === Checkbox.ON) {
    result.user_in_facility.date_start_not_create_support_plan = null;
  }
  if (!facility.mealSaservedServiceFlag) {
    result.user_in_facility.def_food = null;
  }
  if (!facility.transferServiceFlag) {
    result.user_in_facility.def_pickup = null;
  }
  // データベースで必須パラメータなので0を送る
  if (
    !facility.transferServiceFlag ||
    result.user_in_facility.def_pickup === "0"
  ) {
    result.user_in_facility.pickup_premises = "0";
  }
  if (!result.user_in_facility.user_charge_limit_flg) {
    result.user_in_facility.date_begin_user_charge_limit = null;
    result.user_in_facility.date_end_user_charge_limit = null;
  }
  if (!result.user_in_facility.food_serve_addition_flg) {
    result.user_in_facility.date_begin_food_serve_addition = null;
    result.user_in_facility.date_end_food_serve_addition = null;
  }
  if (!result.user_in_facility.care_support_auth_flg) {
    result.user_in_facility.date_begin_care_support_auth = null;
    result.user_in_facility.date_end_care_support_auth = null;
  }
  if (!result.user_in_facility.care_support_payment_flg) {
    result.user_in_facility.date_begin_care_support_payment = null;
    result.user_in_facility.date_end_care_support_payment = null;
  }
  if (!result.user_in_facility.plan_support_payment_flg) {
    result.user_in_facility.date_begin_plan_support_payment = null;
    result.user_in_facility.date_end_plan_support_payment = null;
  }
  if (!result.user_in_facility.plan_support_monitor_flg) {
    result.user_in_facility.date_begin_plan_support_monitor = null;
    result.user_in_facility.date_end_plan_support_monitor = null;
  }
  return result;
};

/**
 * /mgr/facility/users/{id} の結果
 */
export interface UserInFacilityResult {
  user_in_facility: {
    id?: number | null;
    facility_id?: number | null;
    name_sei?: string | null;
    name_mei?: string | null;
    name_sei_kana?: string | null;
    name_mei_kana?: string | null;
    recipient_number?: string | null;
    none_recipient_number_flg?: number | null;
    gender?: string | null;
    classify_physical_flg?: string | null;
    classify_intelligence_flg?: string | null;
    classify_mind_flg?: string | null;
    classify_growth_flg?: string | null;
    classify_brain_flg?: string | null;
    classify_incurable_flg?: string | null;
    classify_handicapped_flg?: string | null;
    date_birth?: string | null;
    postal_code?: string | null;
    prefecture_name?: string | null;
    city_id?: number | null;
    address?: string | null;
    tel?: string | null;
    email?: string | null;
    guardian_name?: string | null;
    guardian_relation?: string | null;
    guardian_tel?: string | null;
    memo?: string | null;

    /* サービス詳細 */

    date_begin_in_service?: string | null;
    date_end_in_service?: string | null;
    date_pay_begin?: string | null;
    date_pay_end?: string | null;
    agreed_by_contract_flg?: string | null;
    pay_days_agreed?: string | null;
    business_number_contract?: string | null;
    income_kind?: string | null;
    uplimit_facility_flg?: string | null;
    uplimit_controlled_by?: string | null;
    uplimit_facility_number?: string | null;
    uplimit_facility_name?: string | null;
    uplimit_total_yen?: number | null;
    uplimit_user_load_yen?: number | null;
    result_of_management?: string | null;
    uplimit_yen?: number | null;
    create_support_plan_flg?: string | null;
    date_start_not_create_support_plan?: string | null;
    def_food?: string | null;
    def_pickup?: string | null;
    pickup_premises?: string | null;

    /* 受給者証 */

    user_charge_limit_flg?: number | null;
    date_begin_user_charge_limit?: string | null;
    date_end_user_charge_limit?: string | null;
    food_serve_addition_flg?: number | null;
    date_begin_food_serve_addition?: string | null;
    date_end_food_serve_addition?: string | null;
    care_support_payment_flg?: number | null;
    date_begin_care_support_payment?: string | null;
    date_end_care_support_payment?: string | null;
    care_support_auth_flg?: number | null;
    date_begin_care_support_auth?: string | null;
    date_end_care_support_auth?: string | null;
    plan_support_payment_flg?: number | null;
    date_begin_plan_support_payment?: string | null;
    date_end_plan_support_payment?: string | null;
    plan_support_monitor_flg?: number | null;
    date_begin_plan_support_monitor?: string | null;
    date_end_plan_support_monitor?: string | null;
  };
  user_in_facility_jiritsukunren_seikatsu: Partial<{
    users_in_facility_id: number | null;
    disability_class: number | null;
    income_kind: number | null;
    blindness_flg: number | null;
    individual_training_implementation_plan_flg: number | null;
    social_life_support_flg: number | null;
  }>;
}

// パラメータの親子関係マッピング表
const parentParamsMap = {
  user_in_facility: {
    date_end_in_service: {
      key: "date_end_in_service",
      childKeys: ["date_begin_in_service"]
    },
    agreed_by_contract_flg: {
      key: "agreed_by_contract_flg",
      childKeys: ["business_number_contract", "pay_days_agreed"]
    },
    business_number_contract: {
      key: "business_number_contract",
      childKeys: ["pay_days_agreed"]
    },
    pay_days_agreed: {
      key: "pay_days_agreed",
      childKeys: ["business_number_contract"]
    },
    uplimit_facility_flg: {
      key: "uplimit_facility_flg",
      childKeys: [
        "uplimit_controlled_by",
        "uplimit_facility_number",
        "uplimit_facility_name",
        "uplimit_total_yen",
        "uplimit_user_load_yen",
        "uplimit_yen",
        "result_of_management"
      ]
    },
    uplimit_controlled_by: {
      key: "uplimit_controlled_by",
      childKeys: [
        "uplimit_facility_number",
        "uplimit_facility_name",
        "uplimit_total_yen",
        "uplimit_user_load_yen",
        "uplimit_yen",
        "result_of_management"
      ]
    },
    result_of_management: {
      key: "result_of_management",
      childKeys: ["uplimit_yen"]
    },
    create_support_plan_flg: {
      key: "create_support_plan_flg",
      childKeys: ["date_start_not_create_support_plan"]
    },
    def_pickup: {
      key: "def_pickup",
      childKeys: ["pickup_premises"]
    },
    pickup_premises: {
      key: "pickup_premises",
      childKeys: ["def_pickup"]
    },
    user_charge_limit_flg: {
      key: "user_charge_limit_flg",
      childKeys: ["date_begin_user_charge_limit", "date_end_user_charge_limit"]
    },
    date_begin_user_charge_limit: {
      key: "date_begin_user_charge_limit",
      childKeys: ["date_end_user_charge_limit"]
    },
    date_end_user_charge_limit: {
      key: "date_end_user_charge_limit",
      childKeys: ["date_begin_user_charge_limit"]
    },
    food_serve_addition_flg: {
      key: "food_serve_addition_flg",
      childKeys: [
        "date_end_food_serve_addition",
        "date_begin_food_serve_addition"
      ]
    },
    date_begin_food_serve_addition: {
      key: "date_begin_food_serve_addition",
      childKeys: ["date_end_food_serve_addition"]
    },
    date_end_food_serve_addition: {
      key: "date_end_food_serve_addition",
      childKeys: ["date_begin_food_serve_addition"]
    },
    care_support_auth_flg: {
      key: "care_support_auth_flg",
      childKeys: ["date_end_care_support_auth", "date_begin_care_support_auth"]
    },
    date_begin_care_support_auth: {
      key: "date_begin_care_support_auth",
      childKeys: ["date_end_care_support_auth"]
    },
    date_end_care_support_auth: {
      key: "date_end_care_support_auth",
      childKeys: ["date_begin_care_support_auth"]
    },
    care_support_payment_flg: {
      key: "care_support_payment_flg",
      childKeys: [
        "date_end_care_support_payment",
        "date_begin_care_support_payment"
      ]
    },
    date_begin_care_support_payment: {
      key: "date_begin_care_support_payment",
      childKeys: ["date_end_care_support_payment"]
    },
    date_end_care_support_payment: {
      key: "date_end_care_support_payment",
      childKeys: ["date_begin_care_support_payment"]
    },
    plan_support_payment_flg: {
      key: "plan_support_payment_flg",
      childKeys: [
        "date_end_plan_support_payment",
        "date_begin_plan_support_payment"
      ]
    },
    date_begin_plan_support_payment: {
      key: "date_begin_plan_support_payment",
      childKeys: ["date_end_plan_support_payment"]
    },
    date_end_plan_support_payment: {
      key: "date_end_plan_support_payment",
      childKeys: ["date_begin_plan_support_payment"]
    },
    plan_support_monitor_flg: {
      key: "plan_support_monitor_flg",
      childKeys: [
        "date_end_plan_support_monitor",
        "date_begin_plan_support_monitor"
      ]
    },
    date_begin_plan_support_monitor: {
      key: "date_begin_plan_support_monitor",
      childKeys: ["date_end_plan_support_monitor"]
    },
    date_end_plan_support_monitor: {
      key: "date_end_plan_support_monitor",
      childKeys: ["date_begin_plan_support_monitor"]
    }
  }
};
