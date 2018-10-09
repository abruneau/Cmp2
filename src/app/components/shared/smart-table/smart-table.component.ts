import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent implements OnInit {

  @Input() table

  sortType = null
  sortReverse = true

  constructor() { }

  ngOnInit() {
  }

  sort(): string {
    let str = this.sortType
    if (!this.sortReverse) {
      str = '-' + this.sortType
    }
    if (str === null) {
      return
    }
    console.log(str)
    return str
  }

}
