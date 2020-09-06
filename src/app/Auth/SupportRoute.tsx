import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import { UserState } from "@stores/domain/user/type";
import NoMatch from "@components/pages/error/NoMatch";

interface OwnProps {
  groupInvoiceCheck?: boolean;
}
interface StateProps {
  user: UserState;
}
type Props = OwnProps & StateProps & RouteProps;

/**
 * サポートだけ表示
 */
const SupportRoute: React.FunctionComponent<Props> = ({
  user,
  groupInvoiceCheck,
  ...props
}) => {
  if (!user.done) {
    return <div />;
  }

  return user.role === "mgrsupport" ? (
    <Route {...props} />
  ) : (
    <Route path={props.path} component={NoMatch} />
  );
};

const mapStateToProps = (state: any): StateProps => ({
  user: state.user
});

export default connect<StateProps>(mapStateToProps)(SupportRoute);
