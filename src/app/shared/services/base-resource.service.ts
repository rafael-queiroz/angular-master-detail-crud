import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient } from "@angular/common/http";
import { Injector } from '@angular/core';

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }
    
    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleError)
        )
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(() => resource), // put nao retorna nada, sendo impossivel chamar o jsonDataToResource, isso serve para o in-memory-web-api
            catchError(this.handleError)
        )
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }



    // PROTECTED METHODS
    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }
    
    protected jsonDataToResources(jsonData: any[]): T[] {
        const categories: T[] = [];

        jsonData.forEach(
            element => categories.push(this.jsonDataToResourceFn(element))
        );
        return categories;
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÂO => ", error);
        return throwError(error);
    }
}