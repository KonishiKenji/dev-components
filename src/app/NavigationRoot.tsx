import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import dispatches from "@stores/dispatches";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthRoutes from "@app/Routes/AuthRoutes";
import GuestRoutes from "@app/Routes/GuestRoutes";
import TemporaryRoutes from "@app/Routes/TemporaryRoutes";
import ResetReminder from "@components/pages/auth/password/ResetReminder";
import ResetReminderComplete from "@components/pages/auth/password/ResetReminderComplete";
import AccountNewUser from "@components/pages/account/NewUser";
import AccountNewUserComplete from "@components/pages/account/NewUserComplete";
import { ResponseError } from "@stores/ui/type";
import ScrollToTop from "@app/ScrollToTop";

interface StateProps {
  isLoggedIn: boolean;
  isCheckedLoggedIn: boolean;
  isTemporaryLoggedIn: boolean;
  responseError: ResponseError;
}

interface DispatchProps {
  checkLogin(): Promise<void>;
  fetchUser(): void;
  logout(): void;
  responseErrorClear(): void;
}

interface MergeProps extends StateProps, DispatchProps {
  isLogin: boolean;
  isLogout: boolean;
}

type Props = MergeProps;

class NavigationGuard extends React.Component<Props> {
  public async componentDidMount() {
    await this.props.checkLogin();
    if (this.props.isLoggedIn) {
      this.props.fetchUser();
    }
  }

  public componentDidUpdate(nextProps: Props) {
    if (nextProps.responseError) {
      this.authenticationFailed(nextProps.responseError.status);
    }
  }

  public componentWillUpdate(nextProps: Props) {
    // ログアウト後にcheckLoginを再度行うため、Reactをv17にする前に見直す
    if (!nextProps.isCheckedLoggedIn) {
      this.props.checkLogin();
    }
  }

  public render() {
    return this.props.isCheckedLoggedIn ? (
      <HashRouter getUserConfirmation={this.getUserConfirmation}>
        <ScrollToTop>
          <Switch>
            <Route
              path="/password/resetreminder/complete"
              component={ResetReminderComplete}
            />
            <Route path="/password/resetreminder" component={ResetReminder} />
            <Route
              path="/account/user/new/complete"
              component={AccountNewUserComplete}
              exact={true}
            />
            <Route
              path="/account/user/new"
              component={AccountNewUser}
              exact={true}
            />
            {this.props.isLogout && <GuestRoutes />}
            {this.props.isLogin && <AuthRoutes />}
            {this.props.isTemporaryLoggedIn && <TemporaryRoutes />}
            {/* 切り替え時用に一時的なリダイレクトループをさせる */}
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </ScrollToTop>
      </HashRouter>
    ) : null;
  }

  /**
   * 認証切れでログアウトさせる
   */
  private authenticationFailed = (status: number) => {
    if ([400, 401].includes(status)) {
      this.props.responseErrorClear();
      // 仮ログイン中userが必ずエラーを返す影響で例外処理を入れている
      if (
        location.hash !== "#/login" &&
        !this.props.isTemporaryLoggedIn &&
        this.props.isLogin
      ) {
        this.props.logout();
      }
    }
  };

  private getUserConfirmation = (
    dialogKey: string,
    callback: (isTransPage: boolean) => void
  ) => {
    const dialogTrigger = window[Symbol.for(dialogKey)];
    if (dialogTrigger) {
      return dialogTrigger(callback);
    }
    callback(true);
  };
}

const mapStateToProps = (state: any): StateProps => ({
  isLoggedIn: state.auth.isLoggedIn,
  isCheckedLoggedIn: state.auth.isChecked,
  isTemporaryLoggedIn: state.auth.isTemporary,
  responseError: state.ui.responseError
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  const { authDispatch, userDispatch, uiDispatch } = dispatches;
  return {
    checkLogin: async () => authDispatch(dispatch).checkLogin(),
    fetchUser: () => userDispatch(dispatch).me(),
    logout: authDispatch(dispatch).logout,
    responseErrorClear: uiDispatch(dispatch).responseErrorClear
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps
): MergeProps => {
  const isLogin = !stateProps.isTemporaryLoggedIn && stateProps.isLoggedIn;
  const isLogout = !stateProps.isTemporaryLoggedIn && !stateProps.isLoggedIn;
  return {
    isLogin,
    isLogout,
    ...stateProps,
    ...dispatchProps
  };
};

export default connect<StateProps, DispatchProps, void, MergeProps>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NavigationGuard);
