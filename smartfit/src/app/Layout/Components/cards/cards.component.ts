import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/Models/location';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{
  @Input() card!: Location;

  constructor() { }

  ngOnInit(): void {

  }

}
