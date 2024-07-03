import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { NavbarComponent } from './navbar/navbar.component';
import { TopsisTableComponent } from './topsis-table/topsis-table.component';
import { importProvidersFrom } from '@angular/core';


export const appConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter([
      { path: '', component: NavbarComponent },
      { path: 'topsis', component: TopsisTableComponent }
    ]),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      TableModule,
      ButtonModule,
      DropdownModule,
      InputNumberModule,
      InputTextModule
    )
  ]
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
