import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IEmail } from 'src/app/interfaces/IEmail';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnChanges {

  @Input() emails: any = [];
  @Output() selectedEmail = new EventEmitter<any>();
  selected: any; 

  ngOnChanges(changes: SimpleChanges): void {
  
    this.emails = this.emails;
  }

  selectEmail(email: IEmail) {
    this.selectedEmail.emit(email);
    this.selected = email;
  }
}
