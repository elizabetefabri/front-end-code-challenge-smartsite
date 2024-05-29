import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './Models/location';
import { GetUnitsService } from './Services/Get/get-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smartfit';
  unitsList: Location[] = []
  showList = new BehaviorSubject(false);

  constructor(private unitService: GetUnitsService) {}

  onSubmit(){
    console.log("chegou no app");
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}
