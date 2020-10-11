import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpcionesBPage } from './opciones-b.page';

describe('OpcionesBPage', () => {
  let component: OpcionesBPage;
  let fixture: ComponentFixture<OpcionesBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesBPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionesBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
