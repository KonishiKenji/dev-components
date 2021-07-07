import * as React from "react";
import { FastField, FieldProps, FormikProps } from "formik";
import FormGroup from "@material-ui/core/FormGroup";
import FormikSelect from "@components/molecules/FormikSelect";
import createOneToNumberOptions from "@utils/createOneToNumberOptions";
import { dateInYYYYFormat, getWarekiList, getLastDay } from "@utils/date";
import { SelectDateValue } from "@interfaces/ui/form";

// FormikSelectDateではここで定義しているためここに配置
const defaultSelect = { label: "選択してください", value: "NOT_SELECTED" };

interface Props {
  name: string;
  label: string;
  required?: boolean;
  addYearTo?: number;
  overrideYearFrom?: number;
  overrideYearTo?: number;
  style?: React.CSSProperties;
  setFormikFieldValue: (
    fieldName: string,
    value: number | boolean | string
  ) => void;
  tooltip?: React.ReactElement<any>;
}

interface ClassProps extends Props {
  value: SelectDateValue;
  form: FormikProps<any>; // 使用されるformikPropsがページごとに違うためany
}

interface ClassState {
  yearOptions: { label: string; value: string | number }[];
  monthOptions: { label: string; value: string }[];
  dayOptions: { label: string; value: string }[];
}

class FormikSelectDateNotSelectedDefaultClass extends React.Component<
  ClassProps,
  ClassState
> {
  public static getDerivedStateFromProps(
    nextProps: ClassProps,
    prevState: ClassState
  ) {
    const year = +nextProps.value.year;
    const month = +nextProps.value.month;
    if (year && month && prevState.dayOptions.length <= 1) {
      const lastDay = year && month ? getLastDay(year, month) : 0;
      const dayOptions = createOneToNumberOptions(lastDay, "日");
      return { dayOptions };
    }
    return null;
  }

  public state = {
    yearOptions: [],
    monthOptions: [],
    dayOptions: []
  };

  public shouldComponentUpdate(nextProps: ClassProps, nextState: ClassState) {
    return (
      nextProps.value.year !== this.props.value.year ||
      nextProps.value.month !== this.props.value.month ||
      nextProps.value.day !== this.props.value.day ||
      nextState.yearOptions.length !== this.state.yearOptions.length ||
      nextState.monthOptions.length !== this.state.monthOptions.length ||
      nextState.dayOptions.length !== this.state.dayOptions.length
    );
  }

  public componentDidMount() {
    const currentYear = +dateInYYYYFormat(new Date());
    const yearFrom = currentYear - 86;
    const from = this.props.overrideYearFrom || yearFrom;
    const to =
      this.props.overrideYearTo || currentYear + (this.props.addYearTo || 0);
    const yearOptions = [defaultSelect, ...getWarekiList(from, to)];
    const monthOptions = createOneToNumberOptions(12, "月");
    const dayOptions = this.newDayOptions(
      +this.props.value.year,
      +this.props.value.month
    );
    this.setState({ yearOptions, monthOptions, dayOptions });
  }

  public render() {
    const { label, name, required, style } = this.props;
    return (
      <FormGroup row={true} style={style || { marginBottom: 32 }}>
        <FormikSelect
          name={`${name}.year`}
          label={label}
          required={required}
          options={this.state.yearOptions}
          onChangeHook={this.handleChangeYear}
          style={{ marginBottom: 0 }}
          tooltip={this.props.tooltip}
        />
        <FormikSelect
          name={`${name}.month`}
          label="月"
          shrink={false}
          size="small"
          options={this.state.monthOptions}
          onChangeHook={this.handleChangeMonth}
          style={{ marginBottom: 0 }}
        />
        <FormikSelect
          name={`${name}.day`}
          label="日"
          shrink={false}
          size="small"
          options={this.state.dayOptions}
          style={{ marginBottom: 0 }}
        />
      </FormGroup>
    );
  }

  /**
   * * 年更新で日付けの初期化判定
   */
  private handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = +e.target.value;
    this.resetDay(year, +this.props.value.month, +this.props.value.day);
    const dayOptions = this.newDayOptions(year, +this.props.value.month);
    this.setState({ dayOptions });
  };

  /**
   * 月更新で日付けの初期化判定
   */
  private handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = +e.target.value;
    this.resetDay(+this.props.value.year, month, +this.props.value.day);
    const dayOptions = this.newDayOptions(+this.props.value.year, month);
    this.setState({ dayOptions });
  };

  /**
   * 日リストは年月更新で毎回変更される
   */
  private newDayOptions = (year: number, month: number) => {
    const lastDay = year && month ? getLastDay(year, month) : 0;
    return createOneToNumberOptions(lastDay, "日");
  };

  /**
   * 年月更新時に最終日が変わる可能性があるため、lastDayからはみ出ていたらリセットを行う
   */
  private resetDay = (year: number, month: number, day: number) => {
    // dayがない => year, monthもない
    if (!day) return;
    if (isNaN(year) || month === 0) {
      this.props.setFormikFieldValue(`${this.props.name}.day`, "");
      return;
    }

    const lastDay = getLastDay(year, month);
    if (day > lastDay) {
      this.props.setFormikFieldValue(`${this.props.name}.day`, "");
    }
  };
}

const FormikSelectDateNotSelectedDefault: React.FunctionComponent<
  Props
> = props => (
  // tslint:disable:jsx-no-lambda
  // FieldProps<any> 使用されるformikPropsがページごとに違うためany
  <FastField
    name={props.name}
    render={({ field, form }: FieldProps<any>) => (
      <FormikSelectDateNotSelectedDefaultClass
        value={field.value}
        form={form}
        {...props}
      />
    )}
  />
);

export default FormikSelectDateNotSelectedDefault;
