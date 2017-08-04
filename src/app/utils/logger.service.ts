import { 
	Injectable 
} 					from '@angular/core';


function addTimeCode(msg: string): string {
	return `[${Date().split(' ')[4]}] ${msg}`;
}


@Injectable()
export class LoggerService {
	log(msg: any)   { console.log(addTimeCode(msg)); }
	error(msg: any) { console.error(addTimeCode(msg)); }
	warn(msg: any)  { console.warn(addTimeCode(msg)); }
}
