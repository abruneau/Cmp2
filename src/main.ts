import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const isProd = (process.env.NODE_ENV === 'production');

if (isProd) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
