import { Component } from '@angular/core';
import { TourService } from 'app/service/tour.service';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.scss']
})
export class FooterComponent {
  constructor(private tourService: TourService) {}
  runTour() {
    this.tourService.runTour();
  }
}
