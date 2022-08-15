import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SheetsPage } from './sheets.page';

describe('SheetsPage', () => {
  let component: SheetsPage;
  let fixture: ComponentFixture<SheetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SheetsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SheetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
