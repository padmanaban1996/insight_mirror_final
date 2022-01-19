import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDashboard } from './model';

const apiLocation = environment.base_api_url + "/dashboard/"
@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private httpService: HttpClient) {

  }

  getDashboardValue(id: string): Observable<AdminDashboard> {
    return this.httpService.get<AdminDashboard>(apiLocation + id);
  }
}
