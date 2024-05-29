import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/Models/location';
import { GetUnitsService } from 'src/app/Services/Get/get-units.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit{
  @Input() unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) {

  }

  ngOnInit(): void {

  }
}
