import { Component, Renderer2 } from '@angular/core';
import { IEmail } from 'src/app/interfaces/IEmail';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isNotification = Notification.permission !== 'granted' ? false : true;
  emails: any = [];
  email:any;

  constructor(private renderer: Renderer2) { }
      
  onSelectedEmail(email: IEmail) {
    this.email = email;
  }

  onListInbox(listInBox: IEmail) {
    if (this.emails.length < listInBox.session.mails.length) {
      this.showNotification();
    }
    this.emails = listInBox.session.mails;
  }

  sendNotification() {
    if (this.isNotification) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.notificationsActived();
          }
        });
      } else {
        this.notificationsActived();
      }
    }
  }

  public showNotification() {
    const options = {
      body: 'Novo e-mail',
      icon: 'https://img.freepik.com/icones-gratis/e-mail_318-859700.jpg'
    };
    const notification = new Notification('Notificação de novo e-mail', options);
  }

  notificationsActived() {
    const options = {
      body: 'Notificações ativadas',
      icon: 'https://img.freepik.com/icones-gratis/e-mail_318-859700.jpg'
    };
    const notification = new Notification('Verifique se você permitiu as notificações em seu navegador.', options);
  }
}
