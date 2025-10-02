import { Directive } from '@angular/core';

@Directive({ 
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)':'onConfimrLeavePage($event)'
    }
})
export class SafeLinkDirective {
    constructor() {
        console.log('SafeLinkDirective is active!');
     }

     onConfimrLeavePage(event: MouseEvent){
       const wanstToLeave= window.confirm('Do you want to leave the app?');

       if(wanstToLeave){
        return;
       }
       event?.preventDefault();
     }
}