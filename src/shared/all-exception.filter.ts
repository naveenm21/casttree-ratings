import { Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception, host): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
        Sentry.withScope((scope) => {
            // Set HTTP context
            scope.setContext("http", {
                method: request.method,
                url: request.url,
                status_code: status,
                headers: request.headers,
                query: request.query,
                params: request.params,
            });

            // Set user context if available
            if (request.user) {
                scope.setUser({
                    id: (request.user as any).id || (request.user as any)._id,
                    email: (request.user as any).email,
                    username: (request.user as any).username,
                });
            }

            // Set tags for better filtering in Sentry
            scope.setTag("http.method", request.method);
            scope.setTag("http.status_code", status);
            scope.setTag("http.url", request.url);

            // Add extra context
            scope.setExtra("request_body", request.body);
            scope.setExtra("ip", request.headers["x-forwarded-for"] || request.ip);
            scope.setExtra("user_agent", request.headers["user-agent"]);

            // Set the transaction name for better grouping
            scope.setTransactionName(
                `${request.method} ${request.route?.path || request.url}`
            );

            // Set level based on status code
            if (status >= 500) {
                scope.setLevel("error");
            } else if (status >= 400) {
                scope.setLevel("warning");
            }

            // Now capture the exception with all the context
            Sentry.captureException(exception);

            response.status(status).json(exception);
        });
    }
}