import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListComponent } from './email-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IEmail } from 'src/app/interfaces/IEmail';

const emailMock: IEmail = {
  session: {
    mails: [],
    __typename: 'EmailSessionType',
  },
};

describe('EmailListComponent', () => {
  let component: EmailListComponent;
  let fixture: ComponentFixture<EmailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailListComponent, MatSelectionList ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selectedEmail event with the provided email object', () => {
    spyOn(component.selectedEmail, 'emit');
    component.selectEmail(emailMock);
    expect(component.selectedEmail.emit).toHaveBeenCalledWith(emailMock);
  });

  it('should set the selected property to the provided email object', () => {
    component.selectEmail(emailMock);
    expect(component.selected).toEqual(emailMock);
  });
});
