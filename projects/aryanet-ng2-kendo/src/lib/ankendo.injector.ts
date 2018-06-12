
import { Injector, Injectable } from '@angular/core';

export class AnKendoInjector {
    static injector: Injector;

    constructor(injector: Injector) {
        AnKendoInjector.injector = injector;
    }
}



