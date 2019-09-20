import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemListService } from 'app/service/item-list.service';
import { Item } from 'app/shared/model/item.model';
import { PlatformService } from 'app/entities/platform';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IPlatform } from 'app/shared/model/platform.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  itemsBk: Item[] = [];
  items: Item[] = [];
  selectedPlatforms: IPlatform[] = [];
  marks: number[] = [];
  isFirstTime = true;
  platforms: IPlatform[];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  constructor(
    private itemListService: ItemListService,
    private platformService: PlatformService,
    private jhiAlertService: JhiAlertService
  ) {}

  ngOnInit() {
    this.getPlatforms();
    this.itemListService.getSearchingStatus().subscribe(() => this.loadItems());
  }

  ngOnDestroy(): void {
    this.itemListService.recreate();
  }

  private loadItems() {
    this.itemListService.loadItems().subscribe(items => {
      this.items = items;
      this.itemsBk = items;
      for (let index = 0; index < items.length; index++) {
        this.calculateMark(items[index]);
      }
    });
  }

  private calculateMark(item: Item) {
    let markTotal = 0;
    item.game.reviews.forEach(review => (markTotal += review.mark || 0));
    if (item.game.reviews && item.game.reviews.length !== 0) {
      this.marks[item.game.id] = Math.floor(markTotal / item.game.reviews.length);
    } else {
      this.marks[item.game.id] = 0;
    }
  }

  private getPlatforms() {
    this.platformService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlatform[]>) => res.ok),
        map((res: HttpResponse<IPlatform[]>) => res.body)
      )
      .subscribe(
        (res: IPlatform[]) => {
          this.platforms = res;
          console.log(JSON.stringify(this.platforms));
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  displayList() {
    const els = document.getElementsByClassName('item');
    for (let index = 0; index < els.length; index++) {
      const element = els[index];
      element.classList.add('list-group-item');
    }
  }

  displayGrid() {
    const els = document.getElementsByClassName('item');
    for (let index = 0; index < els.length; index++) {
      const element = els[index];
      element.classList.remove('list-group-item');
      element.classList.add('grid-group-item');
    }
  }

  onItemSelect() {
    this.filterBasedOnPlatforms();
  }

  onItemDeselect() {
    this.filterBasedOnPlatforms();
    if (this.items.length === 0) {
      this.items = this.itemsBk;
    }
  }

  private filterBasedOnPlatforms() {
    this.items = this.itemsBk.filter(item => {
      let exist = false;
      this.selectedPlatforms.forEach(platform => {
        if (platform.name === item.platform.name) {
          exist = true;
        }
      });
      return exist;
    });
  }

  onSelectAll() {
    this.items = this.itemsBk;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
