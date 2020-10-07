import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrganizacaoPage } from './organizacao.page';

describe('OrganizacaoPage', () => {
  let component: OrganizacaoPage;
  let fixture: ComponentFixture<OrganizacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
