import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
import { JoyrideService } from 'ngx-joyride';
import { TourService } from 'app/service/tour.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, OnDestroy {
  constructor(
    private jhiLanguageHelper: JhiLanguageHelper,
    private router: Router,
    private readonly joyrideService: JoyrideService,
    private tourService: TourService
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'bofgamesApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
    this.startTourListener();
  }

  ngOnDestroy() {
    this.tourService.recreate();
  }

  startTourListener() {
    this.tourService.getTourStatus().subscribe(() =>
      this.joyrideService.startTour({
        steps: ['filters', 'search', 'detail', 'cart'],
        themeColor: '#282c37',
        stepDefaultPosition: 'bottom'
      })
    );
  }

  onMouseWheel(evt) {
    if (window.scrollY > 10) {
      document.getElementById('headerCard').style.paddingTop = '10px';
    } else {
      document.getElementById('headerCard').style.paddingTop = '70px';
    }
  }

  showCardClass() {
    return !(this.router.url === '/games');
  }
}
