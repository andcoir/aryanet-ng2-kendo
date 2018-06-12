import { HostListener, Renderer2, ElementRef, Directive, OnInit, SimpleChanges, OnChanges, OnDestroy, HostBinding } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Directive({
    selector: '[inputRef ]'
})
export class InputRefDirective implements OnInit,
    OnChanges, OnDestroy {


    constructor(
        private router: Router,
        private renderer: Renderer2,
        private el: ElementRef) {

    }

    ngOnInit() {

        // this.router.events
        //     .filter(event => event instanceof NavigationEnd)
        //     .subscribe((e: NavigationEnd) => {
        //         debugger;
        //         if (this._elementClass.length < 1)
        //             this._elementClass.push('k-textbox');
        //     });

        // debugger;
        // const popup = this.renderer.createElement('kendo-popup');
        // this.renderer.insertBefore(this.el.nativeElement, popup,null);
        // this.renderer.setAttribute(this.el.nativeElement, '#'+this.el.nativeElement.id, 'ngModel');
        // this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true');
        // this.renderer.setProperty(this.el.nativeElement, 'alt', 'Cute alligator');
        // this.renderer.addClass(this.el.nativeElement, 'wild');

    }

    protected _elementClass: string[] = [];

    @HostBinding('class')
    get elementClass(): string {
        if (this._elementClass.length < 1)
            this._elementClass.push('k-textbox');

        return this._elementClass.join(' ');
    }


    focus = false;
    @HostListener("focus")
    onFocus() {
        this.focus = true;
    }

    @HostListener("blur")
    onBlur() {
        this.focus = false;
    }



    ngOnDestroy(): void {
    }
    ngOnChanges(changes: SimpleChanges): void {

    }

}