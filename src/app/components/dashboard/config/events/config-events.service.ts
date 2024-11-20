import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigEventsService {

  private eventSubject = new Subject<any>();
  private eventPasswordSubject = new Subject<any>();


  emitEvent(eventData: any): void{
    this.eventSubject.next(eventData);
  }

  getEventObservable(){
    return this.eventSubject.asObservable();
  }

  emitPasswordEvent(eventData: any): void{
    this.eventPasswordSubject.next(eventData);
  }

  getEventPasswordObservable(){
    return this.eventPasswordSubject.asObservable();
  }

  constructor() { }
}
