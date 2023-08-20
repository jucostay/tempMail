import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailComponent } from './create-email.component';
import { Apollo } from 'apollo-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { of, throwError } from 'rxjs';

describe('CreateEmailComponent', () => {
  let component: CreateEmailComponent;
  let fixture: ComponentFixture<CreateEmailComponent>;
  let apollo: Apollo;

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
    apollo = TestBed.inject(Apollo);

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

});
