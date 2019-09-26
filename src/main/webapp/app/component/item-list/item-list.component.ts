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
  platforms: IPlatform[];
  isList = false;
  isAscSort: boolean;
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

  switchListGrid(btnId: number) {
    // 0= listBtn 1= gridBrn
    if (btnId === 0) {
      this.isList = true;
    } else {
      this.isList = false;
    }
  }

  ngOnDestroy(): void {
    this.itemListService.recreate();
  }

  private loadItems() {
    this.itemListService.loadItems().subscribe(items => {
      this.items = items;
      this.itemsBk = items;
      for (let index = 0; index < items.length; index++) {
        this.calculateMark(items[index], index);
      }
    });
  }

  private calculateMark(item: Item, index: number) {
    let markTotal = 0;
    item.game.reviews.forEach(review => (markTotal += review.mark || 0));
    if (item.game.reviews && item.game.reviews.length !== 0) {
      this.marks[index] = Math.floor(markTotal / item.game.reviews.length);
    } else {
      this.marks[index] = 0;
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
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
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

  sortByPriceAsc() {
    this.items = this.items.sort((item1, item2) => {
      return item1.price - item2.price;
    });
    this.isAscSort = true;
  }

  sortByPriceDesc() {
    this.items = this.items.sort((item1, item2) => {
      return item2.price - item1.price;
    });
    this.isAscSort = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
