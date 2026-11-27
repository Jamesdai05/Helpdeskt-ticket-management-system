import * as Sentry from '@sentry/nextjs';

type LogLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

// Breadcrumbs are free: they're only sent along with a real event, giving context for it.
// Only errors create Sentry events, so routine info/warning logs don't burn quota or bury real issues.
export function logEvent(
    message: string,
    category: string = "general",
    data?: Record<string, unknown>,
    level: LogLevel = "info",
    error?: unknown
) {
    Sentry.addBreadcrumb({
        category,
        message,
        data,
        level,
    });

    if (error) {
        Sentry.captureException(error, { extra: data });
    } else if (level === 'error' || level === 'fatal') {
        Sentry.captureMessage(message, level);
    }
}
