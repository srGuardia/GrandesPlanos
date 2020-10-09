import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterOrganizationPage } from './register-organization.page';

describe('RegisterOrganizationPage', () => {
  let component: RegisterOrganizationPage;
  let fixture: ComponentFixture<RegisterOrganizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOrganizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterOrganizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
