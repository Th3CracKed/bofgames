import { Component, OnInit } from '@angular/core';
import { ItemListService } from 'app/service/item-list.service';
import { Item } from 'app/shared/model/item.model';

@Component({
  selector: 'jhi-grid-test',
  templateUrl: './grid-test.component.html',
  styleUrls: ['./grid-test.component.scss']
})
export class GridTestComponent implements OnInit {
  items: Item[] = [];
  marks: number[] = [];

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.itemListService.GetItems().subscribe(items => {
      this.items = items;
      //console.log(' mon resultat   est : ' + JSON.stringify(this.items));
      for (let index = 0; index < items.length; index++) {
        this.calculateMark(items[index]);
        console.log('test');
      }
      // this.calculateMark(items[0]);
    });
  }

  private calculateMark(item: Item) {
    let markTotal = 0;
    item.game.reviews.forEach(review => (markTotal += review.mark || 0));
    console.log(`markTotal = ${markTotal}`);
    if (item.game.reviews && item.game.reviews.length !== 0) {
      this.marks[item.game.id] = Math.floor(markTotal / item.game.reviews.length);
    } else {
      this.marks[item.game.id] = 0;
    }
    console.log(`game id = ${item.game.id}`);
    console.log(`note = ${this.marks[item.game.id]}`);
  }

  displayList() {
    let els = document.getElementsByClassName('item');
    for (let index = 0; index < els.length; index++) {
      const element = els[index];
      element.classList.add('list-group-item');
    }
  }

  displayGrid() {
    let els = document.getElementsByClassName('item');
    for (let index = 0; index < els.length; index++) {
      const element = els[index];
      element.classList.remove('list-group-item');
      element.classList.add('grid-group-item');
    }
  }
}
