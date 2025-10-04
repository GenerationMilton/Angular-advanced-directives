import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({ 
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)':'onConfimrLeavePage($event)'
    }
})
export class SafeLinkDirective {
    queryParam = input('myapp',{alias: 'appSafeLink'});
    //To inject services
    private hostElementRef= inject<ElementRef<HTMLAnchorElement>>(ElementRef);
    
    constructor() {
        console.log('SafeLinkDirective is active!');
     }

     onConfimrLeavePage(event: MouseEvent){
       const wanstToLeave= window.confirm('Do you want to leave the app?');

       if(wanstToLeave){
        const address = this.hostElementRef.nativeElement.href;
        this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
        return;
       }
       event?.preventDefault();
     }
}