import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from 'src/app/Models/location';
import { FilterUnitsService } from 'src/app/Services/Filter/filter-units.service';
import { GetUnitsService } from 'src/app/Services/Get/get-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filterResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filterResults = data;
    });
  }

  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value;
    this.filterResults = this.filterUnitsService.filter(
      this.results,
      showClosed,
      hour
    );
    this.unitService.setFilteredUnits(this.filterResults);
    this.submitEvent.emit();
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
