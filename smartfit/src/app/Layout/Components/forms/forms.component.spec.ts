import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsComponent } from './forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetUnitsService } from 'src/app/Services/Get/get-units.service';

describe('FormsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule  // Importa o HttpClientTestingModule
      ],
      declarations: [
        FormsComponent
      ],
      providers: [
        GetUnitsService
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FormsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
