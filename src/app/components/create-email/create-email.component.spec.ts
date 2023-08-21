import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CreateEmailComponent } from './create-email.component';
import { Apollo } from 'apollo-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Subscription  } from 'rxjs';

describe('CreateEmailComponent', () => {
  let component: CreateEmailComponent;
  let fixture: ComponentFixture<CreateEmailComponent>;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmailComponent, MatSlideToggle ],
      providers: [Apollo],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ id: 'teste' }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar a contagem regressiva e chamar a função quando a contagem chegar a 0', () => {
    component.countdown = 5; 
    spyOn(component, 'restartCountdown');
    spyOn(component, 'callFunction'); 
    component.startCountdown();
    fixture.detectChanges(); 
    fixture.whenStable().then(() => {
      expect(component.countdown).toBe(4);
      expect(component.restartCountdown).not.toHaveBeenCalled();
      expect(component.callFunction).not.toHaveBeenCalled();
      fixture.detectChanges();
      return fixture.whenStable();
    })
    .then(() => {
      expect(component.countdown).toBe(0);
      expect(component.restartCountdown).toHaveBeenCalled();
      expect(component.callFunction).toHaveBeenCalled();
    });
  });

  it('should start the countdown and trigger restartCountdown and callFunction when countdown reaches 0', fakeAsync(() => {
    const restartCountdownSpy = spyOn(component, 'restartCountdown');
    const callFunctionSpy = spyOn(component, 'callFunction');
    component.startCountdown();
    tick(15000);
    expect(component.subscription instanceof Subscription).toBe(true);
    tick(1000);
    expect(restartCountdownSpy).toHaveBeenCalled();
    expect(callFunctionSpy).toHaveBeenCalled();
    component.subscription.unsubscribe();
  }));

  it('should copy the text from an HTMLInputElement', () => {
    const inputElement: HTMLInputElement = document.createElement('input');
    inputElement.value = 'Text to be copied';
    const selectSpy = spyOn(inputElement, 'select');
    const setSelectionRangeSpy = spyOn(inputElement, 'setSelectionRange');
    const execCommandSpy = spyOn(document, 'execCommand');
    component.copy(inputElement);
    expect(selectSpy).toHaveBeenCalled();
    expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 99999);
    expect(execCommandSpy).toHaveBeenCalledWith('copy');
  });

  it('should call getInbox with the session id from localStorage', () => {
    const getInboxSpy = spyOn(component, 'getInbox');
    component.callFunction();
    expect(localStorage.getItem).toHaveBeenCalledWith('session');
    expect(getInboxSpy).toHaveBeenCalledWith('teste');
  });

  it('should reset the countdown to 15', () => {
    component.countdown = 10;
    component.restartCountdown();
    expect(component.countdown).toEqual(15); // Verifique se a propriedade countdown foi definida corretamente
  });

  it('should unsubscribe from the subscription if it exists', () => {
    const unsubscribeSpy = spyOn(Subscription.prototype, 'unsubscribe');
    component.subscription = new Subscription();
    component.stopCountdown();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should not throw an error if subscription is not defined', () => {
    expect(() => component.stopCountdown()).not.toThrowError();
  });


});
