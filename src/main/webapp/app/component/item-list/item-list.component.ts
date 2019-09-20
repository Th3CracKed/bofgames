import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemListService } from 'app/service/item-list.service';
import { Item } from 'app/shared/model/item.model';

@Component({
  selector: 'jhi-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  marks: number[] = [];
  isFirstTime = true;
  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.itemListService.getSearchingStatus().subscribe(() => this.loadItems());
  }

  ngOnDestroy(): void {
    this.itemListService.recreate();
  }

  private loadItems() {
    this.itemListService.loadItems().subscribe(items => {
      this.items = items;
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
}
