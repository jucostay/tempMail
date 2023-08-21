import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IEmail } from 'src/app/interfaces/IEmail';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, MatSlideToggle ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should request notification permission and call notificationsActived when isNotification is true', (done) => {
    const notificationSpy = spyOn(Notification, 'requestPermission').and.returnValue(Promise.resolve('granted'));
    const notificationsActivedSpy = spyOn(component, 'notificationsActived');
    component.isNotification = true;
    component.sendNotification();
    fixture.whenStable().then(() => {
      expect(notificationSpy).toHaveBeenCalled();
      expect(notificationsActivedSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should not request notification permission when isNotification is false', () => {
    const notificationSpy = spyOn(Notification, 'requestPermission');
    component.isNotification = false;
    component.sendNotification();
    expect(notificationSpy).not.toHaveBeenCalled();
  });

  it('should create a Notification with the correct options', () => {
    const notificationClassSpy = spyOn(window, 'Notification');
    component.notificationsActived();
    expect(notificationClassSpy).toHaveBeenCalledWith(
      'Verifique se você permitiu as notificações em seu navegador.',
      {
        body: 'Notificações ativadas',
        icon: 'https://img.freepik.com/icones-gratis/e-mail_318-859700.jpg'
      }
    );
  });

  it('should set the email property when onSelectedEmail is called', () => {
    const selectedEmail: IEmail = {
      session: {
        mails: [],
        __typename: 'EmailSessionType',
      },
    };
    component.onSelectedEmail(selectedEmail);
    expect(component.email).toBe(selectedEmail);
  });

  it('should create a new Notification when showNotification is called', () => {
    // Arrange
    spyOn(window, 'Notification'); // Espionar o construtor de Notification

    // Act
    component.showNotification();

    // Assert
    expect(window.Notification).toHaveBeenCalledWith('Notificação de novo e-mail', {
      body: 'Novo e-mail',
      icon: 'https://img.freepik.com/icones-gratis/e-mail_318-859700.jpg'
    });
  });

});
