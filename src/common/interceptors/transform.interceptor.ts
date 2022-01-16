import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";

interface Response<T> {
    data: T;
}

export class transformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({
            statusCode: 200,
            message: 'success',
            data,
        })));
    }
}