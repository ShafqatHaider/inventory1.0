import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class Observables{
    headers=new HttpHeaders({
        'Accept':'Application/json',
        'Content-type':'Application/json'
    })
constructor(private http:HttpClient){
}

create(url:any, obj:any):Observable<any>
{
    
    return this.http.post(url,obj)
}
getByParam(url:any,param:any):Observable<any>
{
    let unifier= url+param
    return this.http.get(unifier, {headers:this.headers})
}
getLookups(url:any):Observable<any>
{
    return this.http.get(url,{headers:this.headers})
}

}