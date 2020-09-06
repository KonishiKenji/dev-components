import * as Sentry from "@sentry/browser";
import { SENTRY_CONF } from "@config";

export function initSentry() {
  if (process.env.NODE_ENV === "local") return;

  Sentry.init({
    environment: process.env.REACT_APP_API_DOMAIN,
    dsn: SENTRY_CONF.dsn
  });
}

export function sendReactError(error: Error | null, info: object, id?: number) {
  if (process.env.NODE_ENV === "local") return;

  Sentry.withScope(scope => {
    scope.setUser({ id: id ? id.toString() : "" });
    Object.keys(info).forEach(key => {
      scope.setExtra(key, info[key]);
    });
    Sentry.captureException(error);
  });
}
