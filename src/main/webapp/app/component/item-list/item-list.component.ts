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

  constructor(private itemListService: ItemListService) {}

  ngOnInit() {
    this.itemListService.GetItems().subscribe(items => {
      this.items = items;
      console.log(' mon resultat   est : ' + JSON.stringify(this.items));
    });
  }
}
