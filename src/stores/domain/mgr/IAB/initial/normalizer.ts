import { InitialState } from "./types";
import { GetInitialResponse } from "@api/requests/initial/getInitial";
import { PostInitialParams } from "@api/requests/initial/postInitial";
import { InitialDataValues } from "@interfaces/mgr/IAB/initial/initialData";
import { selectDateValueToDatePaddingZero } from "@utils/date";
import isEqual from "lodash-es/isEqual";

/**
 * Normalized Type
 */
export type NormalizedGetInitialResponse = InitialState;

const normalizeApiParams = (
  result: GetInitialResponse["data"]
): InitialState => {
  if (
    result.facility.first_time_bill_date === null ||
    result.facility.first_time_bill_date === "0000-00-00"
  ) {
    result.facility.first_time_bill_date = "";
  }
  return { ...result };
};

export const normalizeGetInitialResult = (
  response: GetInitialResponse
): NormalizedGetInitialResponse => normalizeApiParams(response.data);

export const normalizePostInitialParams = (
  params: Partial<PostInitialParams>,
  state: InitialState
): InitialState => {
  const returnFacility = { ...state.facility, ...params.facility };
  const returnUsers = state.users.map(user => {
    const diffUser = params.users
      ? params.users.find(paramUser => paramUser && user.id === paramUser.id)
      : undefined;
    if (diffUser) {
      const returnValue = {
        ...user,
        ...diffUser
      };
      return returnValue;
    }
    return user;
  });
  return { facility: returnFacility, users: returnUsers };
};

export const normalizeFormValue = (
  values: InitialDataValues,
  initialState: InitialState
): PostInitialParams => {
  const postFacilityValue: PostInitialParams["facility"] = {};
  // first_time_bill_dateのフォーム値は日にちの情報を持たない為
  // 1日をデフォルトで設定しておく
  values.initialData.facility.first_time_bill_date.day = "1";
  if (
    !isEqual(
      undefinedStringReturnValue(
        initialState.facility.first_time_bill_date,
        ""
      ),
      selectDateValueToDatePaddingZero(
        values.initialData.facility.first_time_bill_date
      )
    )
  ) {
    postFacilityValue.first_time_bill_date = selectDateValueToDatePaddingZero(
      values.initialData.facility.first_time_bill_date
    );
  }
  if (
    initialState.facility.total_number_of_users_1_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_1_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_1_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_1_month_before
    );
  }
  if (
    initialState.facility.total_number_of_users_2_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_2_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_2_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_2_month_before
    );
  }
  if (
    initialState.facility.total_number_of_users_3_month_before !==
    stringToNumber(
      values.initialData.facility.total_number_of_users_3_month_before
    )
  ) {
    postFacilityValue.total_number_of_users_3_month_before = stringToNumber(
      values.initialData.facility.total_number_of_users_3_month_before
    );
  }

  const postUsersValue: PostInitialParams["users"] = [];
  values.initialData.users.map((user, index) => {
    postUsersValue.push({
      id: stringToNumber(user.id),
      name_sei: user.name_sei,
      name_mei: user.name_mei,
      total_days_in_fiscal_year: stringToNumber(user.total_days_in_fiscal_year)
    });
  });

  return {
    facility: postFacilityValue,
    users: postUsersValue
  };
};

/**
 * stringの時だけnumberに変換
 */
const stringToNumber = (value?: string): number | undefined => {
  return value !== undefined ? Number(value) : value;
};

const undefinedStringReturnValue = (
  value: string | null | undefined,
  returnValue: string
) => {
  if (value === null || value === undefined) {
    return returnValue;
  }
  return value;
};
