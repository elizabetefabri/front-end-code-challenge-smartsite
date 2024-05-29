import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetUnitsService } from './get-units.service';
import { Location } from 'src/app/Models/location';
import { UnitsResponse } from 'src/app/Models/units-response';

describe('GetUnitsService', () => {
  let service: GetUnitsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetUnitsService]
    });
    service = TestBed.inject(GetUnitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    // Verifica se a requisição foi feita e responde com um payload vazio
    const req = httpMock.expectOne(service.apiUrl);
    req.flush({ current_country_id: 1, locations: [] });
  });

  it('should initialize with data from API', (done) => {
    const dummyUnits: UnitsResponse = {
      current_country_id: 1,
      locations: [
        {
          id: 10998878976097,
          title: "Dom Severino",
          content: "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
          opened: true,
          mask: "required",
          towel: "required",
          fountain: "partial",
          locker_room: "allowed",
          schedules: [
            { weekdays: "Seg. à Sex.", hour: "06h às 22h" },
            { weekdays: "Sáb.", hour: "Fechada" },
            { weekdays: "Dom.", hour: "Fechada" }
          ]
        }
      ]
    };

    // Assina o Observable para verificar se os dados são emitidos corretamente
    service.getAllUnits().subscribe(units => {
      expect(units.length).toBe(1);
      expect(units).toEqual(dummyUnits.locations);
      done();
    });

    // Captura e responde a requisição HTTP com os dados de dummy
    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUnits);
  });

  it('should return filtered units', (done) => {
    const dummyUnits: Location[] = [
      {
        id: 10998878976097,
        title: "Dom Severino",
        content: "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
        opened: true,
        mask: "required",
        towel: "required",
        fountain: "partial",
        locker_room: "allowed",
        schedules: [
          { weekdays: "Seg. à Sex.", hour: "06h às 22h" },
          { weekdays: "Sáb.", hour: "Fechada" },
          { weekdays: "Dom.", hour: "Fechada" }
        ]
      },
      {
        id: 10998878976098,
        title: "Outra Unidade",
        content: "\n<p>Outro Endereço</p>\n",
        opened: false,
        mask: "required",
        towel: "required",
        fountain: "partial",
        locker_room: "allowed",
        schedules: [
          { weekdays: "Seg. à Sex.", hour: "06h às 22h" },
          { weekdays: "Sáb.", hour: "Fechada" },
          { weekdays: "Dom.", hour: "Fechada" }
        ]
      }
    ];

    service.setFilteredUnits(dummyUnits);
    expect(service.getFilteredUnits()).toEqual(dummyUnits);

    const req = httpMock.expectOne(service.apiUrl);
    req.flush({ current_country_id: 1, locations: dummyUnits });

    done();  // Certifique-se de chamar done() após a verificação
  });
});
