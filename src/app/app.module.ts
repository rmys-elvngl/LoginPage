import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {EditUserDiaologComponent} from './edit-user-diaolog/edit-user-diaolog.component';
import {AuthService} from './auth.service';
import {DataService} from './data.service';
import {AuthGuardService} from './auth-guard.service';
// import { authGuardGuard } from './auth-guard.guard';

@NgModule({
  declarations: [AppComponent, EditUserDiaologComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    DataService,
    AuthService, // AuthService'ı burada sağlayıcı olarak ekleyin
    AuthGuardService,
    // AuthGuardService'ı burada sağlayıcı olarak ekleyin
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
