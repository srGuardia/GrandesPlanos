import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterSheetPage } from './register-sheet.page';

describe('RegisterSheetPage', () => {
  let component: RegisterSheetPage;
  let fixture: ComponentFixture<RegisterSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSheetPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
