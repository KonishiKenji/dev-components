import { withRouter, RouteComponentProps } from "react-router-dom";

import * as React from "react";

type Props = RouteComponentProps;
/**
 * 画面遷移時のスクロール
 */
class ScrollToTop extends React.Component<Props> {
  public componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
