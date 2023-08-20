import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { CreateEmailComponent } from './components/create-email/create-email.component';
import { EmailDetailsComponent } from './components/email-details/email-details.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { HomeComponent } from './pages/home/home.component';
import { AccordionEmailListComponent } from './components/accordion-email-list/accordion-email-list.component';

//graphQl
import { GraphQLModule } from './graphql.module';

//Material Angular
import {MatCardModule} from '@angular/material/card';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { Apollo, ApolloModule } from 'apollo-angular';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmailComponent,
    EmailDetailsComponent,
    EmailListComponent,
    HomeComponent,
    AccordionEmailListComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSlideToggleModule,
    ApolloModule,
  ],
  providers: [ApolloModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
