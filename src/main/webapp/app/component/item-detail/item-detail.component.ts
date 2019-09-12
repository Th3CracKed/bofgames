import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from 'app/service/item-detail.service';
import { Item } from 'app/shared/model/item.model';

@Component({
  selector: 'jhi-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  mark = 0;

  constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailService) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.itemDetailService.getItem(params.id).subscribe((item: Item) => {
        this.item = item;
        console.log(` mon resultat  pour l'item numéro ${params.id}` + JSON.stringify(this.item));
        this.calculateMark(item);
      })
    );
  }
  calculateMark(item: Item) {
    let markTotal = 0;
    item.game.reviews.forEach(review => (markTotal += review.mark || 0));
    console.log(`markTotal = ${markTotal}`);
    if (item.game.reviews && item.game.reviews.length !== 0) {
      this.mark = Math.floor(markTotal / item.game.reviews.length);
    }
    console.log(`this.mark = ${this.mark}`);
  }
}
