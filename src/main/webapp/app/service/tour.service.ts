import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private subject = new Subject<void>();
  constructor() {}

  runTour() {
    this.subject.next();
  }

  getTourStatus(): Observable<void> {
    return this.subject.asObservable();
  }

  recreate() {
    this.subject = new Subject<void>();
  }
}
