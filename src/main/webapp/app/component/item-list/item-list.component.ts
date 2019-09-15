import { Component, OnInit } from '@angular/core';
import { ItemListService } from 'app/service/item-list.service';
import { Item } from 'app/shared/model/item.model';

@Component({
  selector: 'jhi-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  marks: number[] = [];

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.itemListService.GetItems().subscribe(items => {
      this.items = items;
      //console.log(' mon resultat   est : ' + JSON.stringify(this.items));
      for (let index = 0; index < items.length; index++) {
        this.calculateMark(items[index]);
        console.log();
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
}
