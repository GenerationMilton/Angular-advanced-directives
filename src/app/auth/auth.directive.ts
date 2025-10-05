import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  //give access to the content of the template
  private templateRef = inject(TemplateRef);
  //give access to the place in the DOM where this directive is being used
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(()=>{
      if(this.authService.activePermission() === this.userType()){
        //render some new content into a certain place in the DOM
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        // this will remove any embedded view that has been rendered
        this.viewContainerRef.clear();
      }
    });
   }

}
