import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { LoginComponent } from './components/login/login.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [
    AppComponent,
    FormDialogComponent,
    MainFeedComponent,
    SingleViewComponent,
    LoginComponent,
  ],
  imports: [
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Subrayado',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Cuerpo',
        h1: 'Título',
        h2: 'Subtítulo',
        h3: 'H3',
        h4: 'H4',
        h5: 'H5',
        h6: 'H6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justificar',
        text_color: 'Color de texto',
        background_color: 'Color de fondo',
        url: 'URL',
        text: 'Texto',
        openInNewTab: 'Abrir en nueva pestaña',
        insert: 'Insertar',
        altText: 'Texto Alternativo',
        title: 'Título',
        remove: 'Borrar',
        enterValidUrl: 'Por favor inserte una URL válida',
      },
    }),
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

