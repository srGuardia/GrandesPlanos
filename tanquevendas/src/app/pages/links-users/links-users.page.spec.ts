import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinksUsersPage } from './links-users.page';

describe('LinksUsersPage', () => {
  let component: LinksUsersPage;
  let fixture: ComponentFixture<LinksUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinksUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinksUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
