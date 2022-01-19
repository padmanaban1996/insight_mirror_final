import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app/app.module';

import { RootModule } from './app/root/root.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = function () { };
  }
}

platformBrowserDynamic().bootstrapModule(RootModule)
  .catch(err => console.error(err));
