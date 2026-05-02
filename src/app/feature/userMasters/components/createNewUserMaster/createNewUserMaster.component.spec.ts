import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewUserMasterComponent } from './createNewUserMaster.component';

describe('CreateNewUserMasterComponent', () => {
  let component: CreateNewUserMasterComponent;
  let fixture: ComponentFixture<CreateNewUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewUserMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
