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

  constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailService) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.itemDetailService.getItem(params.id).subscribe((item: Item) => {
        this.item = item;
        console.log(` mon resultat  pour l'item numéro ${params.id}` + JSON.stringify(this.item));
      })
    );
  }
}
