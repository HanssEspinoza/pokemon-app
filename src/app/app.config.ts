import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'pokemon-app-4c0e4',
          appId: '1:857483380320:web:64af378556e4b42496a505',
          storageBucket: 'pokemon-app-4c0e4.appspot.com',
          apiKey: 'AIzaSyDZMqRbI4VUFFRJ1FD6gDsQp2XdDGJHbMA',
          authDomain: 'pokemon-app-4c0e4.firebaseapp.com',
          messagingSenderId: '857483380320',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideHttpClient(),
  ],
};
