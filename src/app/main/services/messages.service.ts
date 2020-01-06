import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
      private http$: HttpClient
  ) { }

  handleError(error: HttpErrorResponse) {
      return throwError(
          'Something bad happened. Check your logs.'
      );
  }

  getMessages(limit: number = 25, pageToken: string | null = null ) {
      const api = environment.messageApi + 'messages';

      const params: any = { limit };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

      if (pageToken !== null) {
          params.pageToken = pageToken;
      }

      const httpOptions: any = {
          headers,
          params,
          responseType: 'json'
      };

      return this.http$.get(api, httpOptions).pipe(
          catchError(this.handleError)
      )
  }
}
