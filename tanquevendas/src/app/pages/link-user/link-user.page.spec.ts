import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkUserPage } from './link-user.page';

describe('LinkUserPage', () => {
  let component: LinkUserPage;
  let fixture: ComponentFixture<LinkUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
