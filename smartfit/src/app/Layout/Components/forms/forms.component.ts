import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{
  results = [];
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void{
    this.formGroup = this.fb.group({
      hour: '',
      showClosed: false
    })
  }
  onSubmit(): void {
    console.log(this.formGroup.value);
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
