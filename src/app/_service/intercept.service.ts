import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
	public counter: number;
	constructor() {}
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// modify request
		request = request.clone({
			setHeaders: {
				'Content-Type': 'application/json',
				'Accepted': 'application/json',
				'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'false',
			}
		});
		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {}
				}
			)
		);
	}
}
