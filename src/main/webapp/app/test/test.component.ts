import { Component, OnInit } from '@angular/core';
import { TestService } from 'app/service/test.service';

@Component({
  selector: 'jhi-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  res: any = 'nope';
  constructor(private testService: TestService) {}

  ngOnInit() {
    this.testService.GetTest().subscribe(result => {
      this.res = result;
      console.log(' mon resultat   est : ' + this.res.key);
    });
  }
}
