import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailService } from 'app/service/item-detail.service';
import { Item } from 'app/shared/model/item.model';
import { CookieService } from 'ngx-cookie';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private itemDetailService: ItemDetailService,
    private accountService: AccountService,
    private coockies: CookieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.itemDetailService.getItem(params.id).subscribe((item: Item) => {
        this.item = item;
        console.log(` mon resultat  pour l'item numéro ${params.id}` + JSON.stringify(this.item));
      })
    );
  }

  addToCard() {
    if (this.isAuthenticated()) {
      console.log('auth');
      this.accountService.identity().then(account => {
        //request
      });
    } else {
      console.log('not auth');
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
