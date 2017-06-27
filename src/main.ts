import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);


// Debug
//	- used this to test SystemJS integration with Shopify
//alert('Helo from Script via SystemJS');
