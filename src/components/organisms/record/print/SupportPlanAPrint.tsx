import * as React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  StyleRules
} from "@material-ui/core/styles";

// store
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "@stores/type";
import { UserState } from "@stores/domain/user/type";
import { FacilityState } from "@stores/domain/mgr/IAB/facility/types";
import { SupportPlanAState } from "@stores/domain/mgr/A/supportPlan/types";
import { UsersInFacilityState as IABUsersInFacilityState } from "@stores/domain/mgr/IAB/userInFacility/types";
import dispatches from "@stores/dispatches";

// constants
import {
  PRINT_PAGE_HEIGHT,
  PRINT_PAGE_PADDING,
  PRINT_PAGE_WIDTH,
  PRINT_PAGE_MARGIN_BOTTOM
} from "@/constants/styles";
import ClassNames from "classnames";
import {
  FacilityType,
  DISABILITY_CLASS_LIST,
  SUPPLY_PICKUP_SERVICE_LIST2
} from "@constants/variables";
import { SprintType } from "@constants/mgr/IAB/variables";
import circleNumbersList from "@constants/mgr/IAB/circleNumbersList";

// utils
import { getUrlParams } from "@/utils/url";
import { dateToLocalisedString } from "@/utils/date";
import getSnapOrRealName from "@utils/domain/mgr/getSnapOrRealName";
import getSnapOrRealRole from "@utils/domain/mgr/getSnapOrRealRole";
import trimString from "@utils/dataNormalizer/trimString";
import getAge from "@utils/date/getAge";

const styles = (): StyleRules =>
  createStyles({
    page: {
      minHeight: PRINT_PAGE_HEIGHT,
      width: PRINT_PAGE_WIDTH,
      margin: `0 auto ${PRINT_PAGE_MARGIN_BOTTOM}px`,
      padding: `10px ${PRINT_PAGE_PADDING / 2}px`,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      "&:last-child": {
        margin: "0 auto"
      }
    },
    flexContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: 8
    },
    createdDate: {
      letterSpacing: "0.1em"
    },
    planningPeriodDate: {
      letterSpacing: "0.1em",
      fontSize: 10
    },
    entryField: {
      marginBottom: 5
    },
    entryFieldAlignment: {
      display: "flex"
    },
    entryFieldColumn: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    },
    entryFieldContainer: {
      fontSize: 10,
      borderBottom: "1px solid #000",
      marginBottom: 15,
      marginRight: 16,
      width: 64
    },
    entryFieldLabel: {
      fontSize: 8,
      marginBottom: 12,
      color: "#424242"
    },
    entryFieldContentContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 5
    },
    role: {
      fontSize: 8
    },
    entryFieldMark: {
      color: "#9E9E9E",
      fontSize: 12,
      lineHeight: 1.23
    },
    tableContainer: {
      fontSize: 10,
      marginBottom: 24,
      whiteSpace: "pre-line"
    },
    tableTitle: {
      fontWeight: "bold",
      borderBottom: "1px solid #000",
      paddingBottom: 5,
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between"
    },
    tableSubtitle: {
      fontWeight: 500
    },
    dateContainer: {
      marginRight: 10,
      "&:last-child": {
        marginRight: 0
      }
    },
    table: {
      borderCollapse: "collapse",
      borderSpacing: 0,
      border: "2px solid",
      textAlign: "left",
      tableLayout: "fixed",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      "&.sprintGoal": {
        borderBottom: "none",
        "&:last-child": {
          borderBottom: "2px solid"
        }
      },
      "&.fullWidth": {
        width: "100%"
      },
      "& th": {
        fontWeight: "normal",
        borderRight: "1px solid",
        padding: "3px 8px",
        verticalAlign: "top"
      },
      "& td": {
        padding: "4px 12px",
        fontSize: 10,
        letterSpacing: 0.6,
        height: 24,
        color: "#424242",
        "&.label": {
          textAlign: "center"
        },
        "&.prise": {
          textAlign: "right"
        },
        "&.small": {
          height: 100
        },
        "&.middle": {
          height: 200
        },
        "&.large": {
          height: 300
        },
        "&.sssize": {
          width: 40
        },
        "&.ssize": {
          width: 60
        },
        "&.msize": {
          width: 80
        },
        "&.lsize": {
          width: 100
        },
        "&.llsize": {
          width: 180
        },
        "&.borderBold": {
          borderRight: "2px solid"
        },
        "&.borderDashed": {
          borderRight: "1px dashed"
        }
      },
      "& tr": {
        borderBottom: "1px solid",
        "&.borderBold": {
          borderBottom: "2px solid"
        }
      }
    },
    multipleTableWrapper: {
      display: "flex"
    },
    primaryTableHead: {
      width: 120
    },
    secondaryTableHead: {
      width: 170
    },
    sprintTableItem: {
      "&:last-child": {
        borderBottom: "none"
      }
    },
    scheduleTableHead: {
      color: "#424242"
    },
    implementDate: {
      fontWeight: "normal",
      letterSpacing: "0.1em",
      fontSize: 8
    },
    title: {
      margin: 0,
      marginTop: 13,
      fontSize: 24,
      fontWeight: "normal",
      letterSpacing: 1.2,
      color: "rgba(0, 0, 0, 0.84)"
    },
    otherInfo: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 2,
      fontSize: 10
    },
    period: {
      margin: "0 2px"
    },
    nameContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 5
    },
    nameZone: {
      display: "flex"
    },
    author: {
      marginBottom: 10
    },
    name: {
      marginLeft: 2,
      marginRight: 20
    },
    userBasicInfo: {
      display: "flex",
      justifyContent: "space-between"
    },
    userName: {
      width: 368,
      marginBottom: 18
    },
    dateOfBirth: {
      width: 128
    },
    facilityStaff: {
      display: "flex",
      padding: "10px 0"
    },
    staffBox: {
      width: 72,
      height: 80,
      paddingTop: 4,
      border: "1px solid #212121",
      borderRight: "none",
      fontSize: 10,
      color: "#424242",
      textAlign: "center",
      "&:last-child": {
        borderRight: "1px solid #212121"
      }
    },
    counts: {
      fontSize: 10,
      letterSpacing: "0.1em",
      "&:first-child": {
        marginRight: 20
      }
    },
    signatureArea: {
      fontSize: 10
    },
    signature: {
      display: "flex",
      alignItems: "center"
    },
    signatureDate: {
      display: "flex",
      marginLeft: 48,
      marginRight: 20,
      "& :nth-of-type(n+2)": {
        marginLeft: 48
      }
    },
    userNameContainer: {
      width: 200,
      borderBottomColor: "#999"
    },
    authorityNameContainer: {
      width: 416,
      marginTop: 10,
      borderBottomColor: "#999"
    },
    authorityTitle: {
      color: "#424242",
      fontSize: 10
    },
    userEntryFieldLabel: {
      fontSize: 12
    },
    userEntryFieldContentContainer: {
      textAlign: "right",
      fontSize: 16
    },
    userEntryFieldWithMark: {
      borderBottom: "1px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 200,
      marginLeft: 5,
      paddingBottom: 5,
      lineHeight: 1.4
    },
    footer: {
      fontSize: 10,
      borderTop: "1px solid"
    },
    footerContentWrapper: {
      marginTop: 11,
      display: "flex",
      justifyContent: "space-between"
    },
    extendableContent: {
      width: 480,
      wordWrap: "break-word"
    },
    rightSpacedItem: {
      marginRight: 7
    },
    smallSignature: {
      width: 160,
      color: "#424242"
    },
    hideStaffComment: {
      display: "none"
    },
    "@media print": {
      page: {
        width: "172mm",
        height: "251mm",
        minHeight: 0,
        padding: 0,
        margin: "0 auto",
        boxShadow: "none",
        pageBreakAfter: "always",
        "&:last-child": {
          pageBreakAfter: "auto"
        }
      }
    }
  });

/**
 * interface
 */
type SprintData = {
  id?: number; // 登録済みの場合
  number: number; // 短期目標番号
  sprint_type: SprintType; // 目標種別
  sprint_goal: string; // 目標
  adopt_info: string; // 本人の取り組み内容
  support_info: string; // 職員の支援内容
  sprint_start_date: string; // 設定日
  sprint_end_date: string; // 達成予定日
};

type DisplayOptions = {
  display_info?: string;
  display_comment?: string;
  display_minutes?: string;
};
interface StateProps {
  user: UserState;
  userInFacility: IABUsersInFacilityState["user"];
  facility: FacilityState;
  privateSupportPlan: SupportPlanAState["privateSupportPlan"];
}
interface OwnProps {
  uifId: string;
  supportPlanId: string;
  query: string;
}
interface DateData {
  title: string | null;
  date: string | null;
}
interface DispatchProps {
  getPrivateSupportPlanRecordData: (
    uifId: string,
    supportPlanId: string
  ) => void;
  getUserDetailInFacilityData: (
    uifId: string,
    facility_type: FacilityType
  ) => void;
  getFacilityIAB: () => void;
}
type Props = StateProps & OwnProps & DispatchProps & WithStyles<typeof styles>;

interface SheetOwnProps {
  userDetail: {
    nameSei?: string;
    nameMei?: string;
    nameSeiKana?: string;
    nameMeiKana?: string;
    dateBirth?: string;
    gender?: string;
    disabilitySupportClass?: string;
    defPickup?: string;
    facilityName: string;
    recipientNumber?: string;
  };
  fixPlanData: SupportPlanAState["privateSupportPlan"];
  displayOptions: DisplayOptions;
  facilityState: FacilityState;
}
interface SectionTableOwnProps {
  sectionTitle: string;
  sectionPlanData: {
    itemTitle: string;
    content: string | null;
    isContentEmpty?: boolean;
  }[];
  sprintPlanData?: SprintData[];
  implementDate?: string | null;
  displayOptions?: {
    display_info?: string;
    display_comment?: string;
    display_minutes?: string;
  };
  secondaryStyle?: boolean;
  subHeading?: JSX.Element;
  schedule?: boolean;
}
type SheetProps = SheetOwnProps & WithStyles<typeof styles>;

type SectionTableProps = SectionTableOwnProps & WithStyles<typeof styles>;

class SupportPlanAPrint extends React.Component<Props> {
  public displayOptions: DisplayOptions;

  constructor(props: Props) {
    super(props);
    this.displayOptions = {};
  }

  public async componentDidMount(): Promise<void> {
    const { uifId, supportPlanId, query, user } = this.props;
    const queryParameters: {
      display_info?: string;
      display_comment?: string;
      display_minutes?: string;
    } = getUrlParams(query);

    this.props.getUserDetailInFacilityData(uifId, user.facility_type);
    this.props.getPrivateSupportPlanRecordData(uifId, supportPlanId);
    this.props.getFacilityIAB();
    this.displayOptions = queryParameters;
  }

  public render(): JSX.Element | null {
    const {
      classes,
      privateSupportPlan,
      user,
      facility,
      userInFacility
    } = this.props;

    if (
      !privateSupportPlan ||
      Object.keys(privateSupportPlan).length === 0 ||
      Object.keys(userInFacility.user_in_facility).length === 0 ||
      !userInFacility.user_in_facility.id ||
      !user
    ) {
      return null;
    }

    const userDetail = {
      nameSei: userInFacility.user_in_facility.name_sei,
      nameMei: userInFacility.user_in_facility.name_mei,
      nameSeiKana: userInFacility.user_in_facility.name_sei_kana,
      nameMeiKana: userInFacility.user_in_facility.name_mei_kana,
      dateBirth: userInFacility.user_in_facility.date_birth,
      gender: userInFacility.user_in_facility.gender,
      disabilitySupportClass:
        userInFacility.user_in_facility.classify_disability_support,
      defPickup: userInFacility.user_in_facility.def_pickup,
      facilityName: user.facility_name,
      recipientNumber: userInFacility.user_in_facility.recipient_number
    };

    return (
      <Sheet
        classes={classes}
        userDetail={userDetail}
        fixPlanData={privateSupportPlan}
        displayOptions={this.displayOptions}
        facilityState={facility}
      />
    );
  }
}

const SectionTable = (props: SectionTableProps): JSX.Element => {
  const {
    classes,
    sectionTitle,
    sectionPlanData,
    sprintPlanData,
    implementDate,
    displayOptions,
    secondaryStyle,
    subHeading,
    schedule
  } = props;

  if (sprintPlanData) {
    // 長期目標[0]と短期目標[1]は空でも表示されるが個別目標は非表示にすべきなのでindexが2以降で要素が空か判定する
    const isSprintPlanDataEmpty = ![2, 3, 4, 5, 6].some((index) => {
      const sprintPlanDataItem = sprintPlanData[index];
      return (
        trimString(sprintPlanDataItem.adopt_info) ||
        trimString(sprintPlanDataItem.support_info) ||
        trimString(sprintPlanDataItem.sprint_goal) ||
        trimString(sprintPlanDataItem.sprint_start_date) ||
        trimString(sprintPlanDataItem.sprint_end_date)
      );
    });
    if (isSprintPlanDataEmpty) return <></>;
  }

  if (schedule) {
    const isScheduleEmpty = !sectionPlanData.some(
      (scheduleItem) => !scheduleItem.isContentEmpty
    );
    if (isScheduleEmpty) return <></>;
  }

  const toCircled = (num: number): string => {
    return circleNumbersList[num - 1];
  };

  const returnApplicablePeriod = (
    startDate: string,
    endDate: string
  ): JSX.Element => {
    if (startDate === "" && endDate === "") {
      return <></>;
    }

    const startDateElement =
      startDate !== "" ? dateToLocalisedString(startDate, "YYYY年M月D日") : "-";
    const endDateElement =
      endDate !== "" ? dateToLocalisedString(endDate, "YYYY年M月D日") : "-";

    return <span>{`${startDateElement} 〜 ${endDateElement}`}</span>;
  };

  return (
    <section>
      <div className={classes.tableTitle}>
        <span>{sectionTitle}</span>
        {implementDate && (
          <span className={classes.implementDate}>
            実施日:
            {implementDate === "-"
              ? implementDate
              : dateToLocalisedString(implementDate, "YYYY年M月D日")}
          </span>
        )}
        {subHeading && (
          <span className={classes.tableSubtitle}>{subHeading}</span>
        )}
      </div>
      {sprintPlanData ? (
        // sprintPlanDataの0,1は長期目標と短期目標なので除外し、個別目標は2から
        [2, 3, 4, 5, 6].map(
          (index): JSX.Element => {
            const planKey = sprintPlanData[index];
            const planNumber = toCircled(planKey.number);
            return (
              <React.Fragment key={index}>
                {(planKey.sprint_goal ||
                  planKey.adopt_info ||
                  planKey.support_info ||
                  planKey.sprint_start_date ||
                  planKey.sprint_end_date) && (
                  <table className={`${classes.table} fullWidth sprintGoal`}>
                    <tbody>
                      <tr>
                        <th className={classes.primaryTableHead}>
                          {planNumber}
                          目標
                        </th>
                        <td>{planKey.sprint_goal}</td>
                      </tr>
                      <tr className={classes.sprintTableItem}>
                        <th className={classes.primaryTableHead}>適用期間</th>
                        <td>
                          {returnApplicablePeriod(
                            planKey.sprint_start_date,
                            planKey.sprint_end_date
                          )}
                        </td>
                      </tr>
                      <tr className={classes.sprintTableItem}>
                        <th className={classes.primaryTableHead}>
                          本人の取組内容
                        </th>
                        <td>{planKey.adopt_info}</td>
                      </tr>
                      {displayOptions && displayOptions.display_info && (
                        <tr className={classes.sprintTableItem}>
                          <th className={classes.primaryTableHead}>
                            職員の支援内容
                          </th>
                          <td>{planKey.support_info}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            );
          }
        )
      ) : (
        <table className={`${classes.table} fullWidth`}>
          <tbody>
            {sectionPlanData.map((planKey, index) => {
              const keyNumber = index;
              if (planKey.isContentEmpty)
                return <React.Fragment key={keyNumber} />;
              return (
                <tr
                  className={
                    displayOptions &&
                    !displayOptions.display_comment &&
                    planKey.itemTitle === "職員コメント"
                      ? classes.hideStaffComment
                      : ""
                  }
                  key={keyNumber}
                >
                  {secondaryStyle ? (
                    <th className={classes.secondaryTableHead}>
                      {planKey.itemTitle}
                    </th>
                  ) : (
                    <th
                      className={ClassNames(
                        classes.primaryTableHead,
                        schedule && classes.scheduleTableHead
                      )}
                    >
                      {planKey.itemTitle}
                    </th>
                  )}
                  <td>{planKey.content}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

const Sheet = (props: SheetProps): JSX.Element => {
  const {
    classes,
    userDetail,
    fixPlanData,
    displayOptions,
    facilityState
  } = props;
  // 事業所Noと電話番号改行用の処理
  const officeName = React.useRef() as React.MutableRefObject<HTMLSpanElement>;
  const officeAddress = React.useRef() as React.MutableRefObject<
    HTMLSpanElement
  >;
  const [isOfficeNameLong, setIsOfficeNameLong] = React.useState(false);
  const [isAddressLong, setIsAddressLong] = React.useState(false);
  const breakPoint = 365;
  React.useEffect(() => {
    setIsOfficeNameLong(officeName.current.offsetWidth > breakPoint);
  }, [officeName.current]);
  React.useEffect(() => {
    setIsAddressLong(officeAddress.current.offsetWidth > breakPoint);
  }, [officeAddress.current]);

  const { author, authorizer } = fixPlanData;
  // 作成者名
  const authorValue = getSnapOrRealName(author, "");
  // 承認者名
  const authorizerName = getSnapOrRealName(authorizer, "");
  // 承認者役職
  const authorizerRole = getSnapOrRealRole(authorizer, "");

  /**
   * support_plan_goalは入力していないnumberは返って来ないので、ない場合は初期値でセットする
   */
  const supplementSupportPlanGoal = (
    supportPlanGoal: SupportPlanAState["privateSupportPlan"]["support_plan_goal"]
  ): SprintData[] => {
    const numberOfLongOrShort = 1;
    const convertPrivateToRecord = (
      res:
        | SupportPlanAState["privateSupportPlan"]["support_plan_goal"][0]
        | undefined,
      defaultNumber: number,
      defaultSprintType: SprintType
    ): SprintData => {
      return res
        ? {
            id: res.id,
            number: res.number,
            sprint_type: res.sprint_type,
            sprint_goal: res.sprint_goal || "",
            adopt_info: res.adopt_info || "",
            support_info: res.support_info || "",
            sprint_start_date: res.sprint_start_date || "",
            sprint_end_date: res.sprint_end_date || ""
          }
        : {
            number: defaultNumber,
            sprint_type: defaultSprintType,
            sprint_goal: "",
            adopt_info: "",
            support_info: "",
            sprint_start_date: "",
            sprint_end_date: ""
          };
    };

    const supportPlanGoalLong = convertPrivateToRecord(
      supportPlanGoal.find((g) => g.sprint_type === SprintType.LONG),
      numberOfLongOrShort,
      SprintType.LONG
    );
    const supportPlanGoalShort = convertPrivateToRecord(
      supportPlanGoal.find((g) => g.sprint_type === SprintType.SHORT),
      numberOfLongOrShort,
      SprintType.SHORT
    );
    const tmpSupportPlanGoalIndividuals = supportPlanGoal.filter(
      (g) => g.sprint_type === SprintType.INDIVIDUAL
    );
    const individualNumbers = [1, 2, 3, 4, 5]; // 個別目標 1~5
    const supportPlanGoalIndividuals = individualNumbers.map((num) => {
      const res = tmpSupportPlanGoalIndividuals.find((s) => s.number === num);
      return convertPrivateToRecord(res, num, SprintType.INDIVIDUAL);
    });
    return [
      supportPlanGoalLong,
      supportPlanGoalShort,
      ...supportPlanGoalIndividuals
    ];
  };

  const [supportPlanGoal] = React.useState(
    supplementSupportPlanGoal(fixPlanData.support_plan_goal)
  );

  const filteredName: string[] = [];
  if (fixPlanData.participant) {
    fixPlanData.participant
      .filter((result) => result.name)
      .map((participant) => filteredName.push(participant.name));
  }
  const mtgData = [
    {
      itemTitle: "会議議事録",
      content: fixPlanData.minutes
    },
    {
      itemTitle: "参加者",
      content: filteredName.join("、")
    }
  ];
  const hopeData = [
    {
      itemTitle: "就労継続支援A型利用までの経緯(活動歴や病歴等)",
      content: fixPlanData.details,
      isContentEmpty: !trimString(fixPlanData.details)
    },
    {
      itemTitle:
        "本人の希望（業務内容、労働時間、賃金、一般就労の希望の有無等）",
      content: fixPlanData.user_request_text
    },
    {
      itemTitle: "本人の障害基礎年金等の有無や収入状況",
      content: fixPlanData.income_status,
      isContentEmpty: !trimString(fixPlanData.income_status)
    },
    {
      itemTitle: "本人の生産活動を行う際の課題",
      content: fixPlanData.user_issue,
      isContentEmpty: !trimString(fixPlanData.user_issue)
    },
    {
      itemTitle: "健康状態（病名、服薬状況等）",
      content: fixPlanData.physical_condition,
      isContentEmpty: !trimString(fixPlanData.physical_condition)
    },
    {
      itemTitle: "生産活動や支援で留意する医学的リスクなど",
      content: fixPlanData.risk_factor,
      isContentEmpty: !trimString(fixPlanData.risk_factor)
    },
    {
      itemTitle: "生活環境や自宅での役割などの本人の生活状況",
      content: fixPlanData.current_status
    }
  ];
  const longTermGoalData = [
    {
      itemTitle: "目標",
      content: supportPlanGoal[0] ? supportPlanGoal[0].sprint_goal : ""
    }
  ];
  const shortTermGoalData = [
    {
      itemTitle: "目標",
      content: supportPlanGoal[1] ? supportPlanGoal[1].sprint_goal : ""
    }
  ];
  const otherData = [
    {
      itemTitle: "特記事項",
      content: fixPlanData.remarks
    },
    {
      itemTitle: "職員コメント",
      content: fixPlanData.staff_comment
    }
  ];
  const longTermGoalSubHeading = [
    {
      title: "設定日",
      date: supportPlanGoal[0] ? supportPlanGoal[0].sprint_start_date : ""
    },
    {
      title: "達成予定日",
      date: supportPlanGoal[0] ? supportPlanGoal[0].sprint_end_date : ""
    }
  ];
  const shortTermGoalSubHeading = [
    {
      title: "設定日",
      date: supportPlanGoal[1] ? supportPlanGoal[1].sprint_start_date : ""
    },
    {
      title: "達成予定日",
      date: supportPlanGoal[1] ? supportPlanGoal[1].sprint_end_date : ""
    }
  ];
  const scheduleData = fixPlanData.support_plan_program.map((item) => {
    if (!trimString(item.scheduled_time) && !trimString(item.service_content)) {
      return {
        itemTitle: "",
        content: "",
        isContentEmpty: true
      };
    }
    return {
      itemTitle: item.scheduled_time || "",
      content: item.service_content
    };
  });
  const pickupValue = SUPPLY_PICKUP_SERVICE_LIST2.find(
    (p) => Number(p.value) === fixPlanData.pickup
  );
  const pickupDefaultValue = SUPPLY_PICKUP_SERVICE_LIST2[0].label;
  const dateForSubHeading = (data: Array<DateData>): JSX.Element => {
    return (
      <div>
        {data.map((item: DateData, index: number) => {
          return (
            <span
              className={classes.dateContainer}
              key={`${item.title || index} ${item.date || index}`}
            >
              <span>{`${item.title}:`}</span>
              <span>
                {item.date === "" || item.date === null
                  ? "-"
                  : dateToLocalisedString(item.date, "YYYY年M月D日")}
              </span>
            </span>
          );
        })}
      </div>
    );
  };
  return (
    <div className={classes.page}>
      <header>
        <h1 className={classes.title}>就労継続支援A型計画書</h1>
      </header>
      <div className={classes.otherInfo}>
        <div>
          <div className={classes.createdDate}>
            <span className={classes.counts}>
              計画作成日:
              {dateToLocalisedString(
                fixPlanData.creation_date !== null
                  ? fixPlanData.creation_date
                  : "",
                "YYYY年M月D日"
              )}
            </span>
            <span className={classes.counts}>
              前回作成日:
              {fixPlanData.previous_creation_date ? (
                dateToLocalisedString(
                  fixPlanData.previous_creation_date,
                  "YYYY年M月D日"
                )
              ) : (
                <></>
              )}
            </span>
          </div>
          <div>
            <span>支援期間:</span>
            <span className={classes.planningPeriodDate}>
              {dateToLocalisedString(
                fixPlanData.support_begin_date !== null
                  ? fixPlanData.support_begin_date
                  : "",
                "YYYY年M月D日"
              )}
              <span className={classes.period}>~</span>
              {dateToLocalisedString(
                fixPlanData.support_end_date !== null
                  ? fixPlanData.support_end_date
                  : "",
                "YYYY年M月D日"
              )}
            </span>
          </div>
        </div>
        <div>
          <div className={classes.nameContainer}>
            <span>計画作成者</span>
            <div className={classes.userEntryFieldWithMark}>
              <span>{authorValue}</span>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
          <div className={classes.nameContainer}>
            <span>承認者</span>
            <div className={classes.userEntryFieldWithMark}>
              <div className={classes.name}>
                <div>{authorizerRole}</div>
                <div>{authorizerName}</div>
              </div>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.userBasicInfo}>
        <div className={classes.entryField}>
          <div
            className={ClassNames(
              classes.entryFieldContainer,
              classes.userName
            )}
          >
            <span className={classes.entryFieldLabel}>氏名（フリガナ）</span>
            <div className={classes.entryFieldContentContainer}>
              <span>{`${userDetail.nameSei} ${userDetail.nameMei}（${userDetail.nameSeiKana} ${userDetail.nameMeiKana}）`}</span>
            </div>
          </div>
          <div className={classes.entryFieldAlignment}>
            <div
              className={ClassNames(
                classes.entryFieldContainer,
                classes.dateOfBirth
              )}
            >
              <span className={classes.entryFieldLabel}>生年月日（年齢）</span>
              <div className={classes.entryFieldContentContainer}>
                <span>
                  {dateToLocalisedString(
                    userDetail.dateBirth !== undefined
                      ? userDetail.dateBirth
                      : "",
                    "YYYY年M月D日"
                  )}
                  {`（${getAge(userDetail.dateBirth)}歳）`}
                </span>
              </div>
            </div>
            <div className={classes.entryFieldContainer}>
              <span className={classes.entryFieldLabel}>性別</span>
              <div className={classes.entryFieldContentContainer}>
                <span>{userDetail.gender === "1" ? "男" : "女"}</span>
              </div>
            </div>
            <div className={classes.entryFieldContainer}>
              <span className={classes.entryFieldLabel}>障害支援区分</span>
              <div className={classes.entryFieldContentContainer}>
                <span>
                  {
                    DISABILITY_CLASS_LIST[
                      userDetail.disabilitySupportClass
                        ? Number(userDetail.disabilitySupportClass)
                        : 0
                    ].label
                  }
                </span>
              </div>
            </div>
            <div className={classes.entryFieldContainer}>
              <span className={classes.entryFieldLabel}>送迎</span>
              <div className={classes.entryFieldContentContainer}>
                <span>
                  {pickupValue ? pickupValue.label : pickupDefaultValue}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.facilityStaff}>
          <div className={classes.staffBox}>
            <span>管理者</span>
          </div>
          <div className={classes.staffBox}>
            <span>
              サービス管理
              <br />
              責任者
            </span>
          </div>
          <div className={classes.staffBox}>
            <span>職業指導員</span>
          </div>
          <div className={classes.staffBox}>
            <span>生活支援員</span>
          </div>
        </div>
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="本人情報"
          sectionPlanData={hopeData}
          secondaryStyle
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="長期目標"
          sectionPlanData={longTermGoalData}
          subHeading={dateForSubHeading(longTermGoalSubHeading)}
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="短期目標"
          sectionPlanData={shortTermGoalData}
          subHeading={dateForSubHeading(shortTermGoalSubHeading)}
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="目標と支援の提供方針・内容"
          sectionPlanData={[{ itemTitle: "", content: "" }]}
          sprintPlanData={supportPlanGoal}
          displayOptions={displayOptions}
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="プログラム（1日の流れ）"
          sectionPlanData={scheduleData}
          displayOptions={displayOptions}
          schedule
        />
      </div>
      <div className={classes.tableContainer}>
        <SectionTable
          classes={classes}
          sectionTitle="その他"
          sectionPlanData={otherData}
          displayOptions={displayOptions}
        />
      </div>
      {displayOptions.display_minutes && (
        <div className={classes.tableContainer}>
          <SectionTable
            classes={classes}
            sectionTitle="個別支援会議 議事録"
            implementDate={fixPlanData.minutes_date || "-"}
            sectionPlanData={mtgData}
          />
        </div>
      )}
      <div className={classes.signatureArea}>
        <p>
          上記個別支援計画書の内容についてサービス管理責任者より説明を受け、同意の上受領しました。
        </p>
        <div className={classes.signature}>
          <div className={classes.signatureDate}>
            <span>年</span>
            <span>月</span>
            <span>日</span>
          </div>
          <div
            className={ClassNames(
              classes.entryFieldContainer,
              classes.userNameContainer
            )}
          >
            <span className={classes.entryFieldLabel}>ご本人氏名</span>
            <div className={classes.userEntryFieldContentContainer}>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
          <div
            className={`${classes.entryFieldContainer} ${classes.userNameContainer}`}
          >
            <span className={classes.entryFieldLabel}>ご家族氏名</span>
            <div className={classes.userEntryFieldContentContainer}>
              <span className={classes.entryFieldMark}>印</span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.signatureArea}>
        <p>
          上記計画書に基づきサービスの説明を行い、内容に同意頂きましたので、ご報告申し上げます。
        </p>
        <div className={classes.signature}>
          <div className={classes.signatureDate}>
            <span>年</span>
            <span>月</span>
            <span>日</span>
          </div>
          <div
            className={ClassNames(
              classes.entryFieldContainer,
              classes.authorityNameContainer
            )}
          >
            <div className={classes.userEntryFieldContentContainer}>
              <span className={classes.authorityTitle}>
                相談支援専門員様/事業所様
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.footerContentWrapper}>
          <div>
            <div className={classes.extendableContent}>
              <span ref={officeName} className={classes.rightSpacedItem}>
                {`就労継続支援A型 ${facilityState.officeName}`}
              </span>
              {isOfficeNameLong && <br />}
              <span>{`事業所No. ${facilityState.officeNumber}`}</span>
            </div>
            <div className={classes.extendableContent}>
              <span ref={officeAddress}>
                <span>{`〒${facilityState.postalCode} `}</span>
                <span>
                  {facilityState.restAddress}
                  &nbsp;
                </span>
              </span>
              {isAddressLong && <br />}
              <span>{`tel: ${facilityState.tel}`}</span>
            </div>
          </div>
          <div>
            <div className={classes.smallSignature}>管理者:</div>
            <div className={classes.smallSignature}>説明者:</div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: AppState): StateProps => {
  const user = state.user as UserState;
  const userInFacility = state.IAB.userInFacility.user;
  const { facility } = state.IAB;
  return {
    user,
    userInFacility,
    facility,
    privateSupportPlan: state.A.supportPlan.privateSupportPlan
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { supportPlanDispatcher } = dispatches;
  const getPrivateSupportPlanRecordData = (
    uifId: string,
    supportPlanId: string
  ): Promise<void> =>
    supportPlanDispatcher(dispatch).fetchPrivateSupportPlan(
      uifId,
      supportPlanId
    );
  const getUserDetailInFacilityData = (uifId: string): Promise<void> => {
    // 種別として移行AB or 生活介護が利用する機能なので
    // facility_typeで該当種別のdispatcherを選択する
    const dispatcher = dispatches.IAB;

    return dispatcher.userInFacilityDispatcher(dispatch).fetchOne(uifId);
  };

  const getFacilityIAB = (): Promise<void> => {
    const dispatcher = dispatches.IAB;

    return dispatcher.facilityDispatcher(dispatch).fetch();
  };

  return {
    getPrivateSupportPlanRecordData,
    getUserDetailInFacilityData,
    getFacilityIAB
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SupportPlanAPrint));
