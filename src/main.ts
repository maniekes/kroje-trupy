import {enableProdMode, importProvidersFrom} from '@angular/core';


import {APP_CONFIG} from './environments/environment';
import {AppComponent} from './app/app.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app/app-routing.module';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideAnimations} from '@angular/platform-browser/animations';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';

const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');


if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FormsModule, AppRoutingModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    {
      provide: LocationStrategy,
      useClass: APP_CONFIG.electron ? HashLocationStrategy : PathLocationStrategy
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));
