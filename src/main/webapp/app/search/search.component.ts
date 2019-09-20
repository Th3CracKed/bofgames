import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemListService } from 'app/service/item-list.service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private itemListService: ItemListService) {}

  ngOnInit() {}

  search(keywordToSearch: any) {
    this.router.navigateByUrl('/games');
    this.itemListService.scheduleSearch(keywordToSearch);
  }
}
