import { TestBed } from '@angular/core/testing';
import { FilterUnitsService } from './filter-units.service';
import { Location } from 'src/app/Models/location';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FilterUnitsService', () => {
  let service: FilterUnitsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilterUnitsService]
    });
    service = TestBed.inject(FilterUnitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform weekdays correctly', () => {
    expect(service.transformWeekday(0)).toBe('Dom.');
    expect(service.transformWeekday(6)).toBe('Sáb.');
    expect(service.transformWeekday(3)).toBe('Seg. à Sex.');
  });

  it('should filter units based on opening hours', () => {
    const unit: Location = {
      id: 1,
      title: 'Unit 1',
      content: '',
      opened: true,
      mask: '',
      towel: '',
      fountain: '',
      locker_room: '',
      schedules: [
        { weekdays: 'Seg. à Sex.', hour: '06h às 18h' }
      ]
    };

    expect(service.filterUnits(unit, '06', '12')).toBeTrue();
    expect(service.filterUnits(unit, '12', '18')).toBeTrue();
    expect(service.filterUnits(unit, '18', '23')).toBeFalse();
  });

  it('should filter locations based on opening status and hours', () => {
    const locations: Location[] = [
      { id: 1, title: 'Unit 1', content: '', opened: true, mask: '', towel: '', fountain: '', locker_room: '', schedules: [{ weekdays: 'Seg. à Sex.', hour: '06h às 18h' }] },
      { id: 2, title: 'Unit 2', content: '', opened: false, mask: '', towel: '', fountain: '', locker_room: '', schedules: [{ weekdays: 'Seg. à Sex.', hour: '12h às 20h' }] },
      { id: 3, title: 'Unit 3', content: '', opened: true, mask: '', towel: '', fountain: '', locker_room: '', schedules: [{ weekdays: 'Seg. à Sex.', hour: '18h às 23h' }] }
    ];

    let result = service.filter(locations, false, 'morning');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Unit 1');

    result = service.filter(locations, true, 'afternoon');
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Unit 1');
    expect(result[1].title).toBe('Unit 2');
  });
});
