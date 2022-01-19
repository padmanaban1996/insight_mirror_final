import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminCreate, AdminUser } from './model';

const Api_location = environment.base_api_url + '/user/';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private httpClient: HttpClient
    ) { }

    createAdminUser(body: AdminCreate): Observable<AdminUser> {
        return this.httpClient.post<AdminUser>(Api_location, body);
    }
    getAdmins(id: string): Observable<AdminUser[]> {

        return this.httpClient.get<AdminUser[]>(Api_location + 'school/' + id)
    }
    getSingleAdmin(id: string): Observable<AdminUser> {
        return this.httpClient.get<AdminUser>(Api_location + '/singleuser/' + id)
    }
}
