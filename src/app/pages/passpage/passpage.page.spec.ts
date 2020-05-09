import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasspagePage } from './passpage.page';

describe('PasspagePage', () => {
  let component: PasspagePage;
  let fixture: ComponentFixture<PasspagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasspagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
