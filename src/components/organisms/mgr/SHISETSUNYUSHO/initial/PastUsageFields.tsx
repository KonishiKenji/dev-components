import * as React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { WithStyles, withStyles, createStyles } from "@material-ui/core";
import FormPaper from "@components/atoms/FormPaper";
import FormikTextField from "@components/molecules/FormikTextField";
import SectionTitle from "@components/atoms/SectionTitle";

const styles = () =>
  createStyles({
    description: {
      marginBottom: 28
    },
    sectionTitle: {
      marginBottom: 18
    },
    space: {
      marginLeft: 16
    },
    required: {
      marginLeft: 4
    }
  });

type Props = WithStyles<typeof styles>;

const PastUsageFields: React.FC<Props> = (props) => {
  return (
    <FormPaper>
      <div className={props.classes.sectionTitle}>
        <SectionTitle label="過去３ヶ月間の利用実績" />
      </div>
      <p className={props.classes.description}>
        上記初回請求月の過去３ヶ月間の延べ利用者数を入力してください。
      </p>
      <FormGroup>
        <FormikTextField
          name="initialData.facility.total_number_of_users_1_month_before"
          label={
            <div>
              １ヶ月前
              <span className={props.classes.space}>延べ利用者数</span>
              <span className={props.classes.required}>*</span>
            </div>
          }
          endAdornmentLabel="人"
          maxLength={10}
        />
        <FormikTextField
          name="initialData.facility.total_number_of_users_2_month_before"
          label={
            <div>
              ２ヶ月前
              <span className={props.classes.space}>延べ利用者数</span>
              <span className={props.classes.required}>*</span>
            </div>
          }
          endAdornmentLabel="人"
          maxLength={10}
        />
        <FormikTextField
          name="initialData.facility.total_number_of_users_3_month_before"
          label={
            <div>
              ３ヶ月前
              <span className={props.classes.space}>延べ利用者数</span>
              <span className={props.classes.required}>*</span>
            </div>
          }
          endAdornmentLabel="人"
          maxLength={10}
        />
      </FormGroup>
    </FormPaper>
  );
};

export default withStyles(styles)(PastUsageFields);
