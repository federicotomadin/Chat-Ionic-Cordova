import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpcionesPage } from './opciones.page';

describe('OpcionesPage', () => {
  let component: OpcionesPage;
  let fixture: ComponentFixture<OpcionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
