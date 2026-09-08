import * as Sentry from '@sentry/nextjs';

type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export function logEvent(
    message: string,
    category: string = "general",
    data?: Record<string, any>, // this is the general type.
    level: LogLevel = "info",
    error?:unknown
) {
    // to add the Breadcrumb for the message.
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level,
    });

    if (error) {
        Sentry.captureException(error, { extra: data });
    } else {
        Sentry.captureMessage(message,level)
    }
}