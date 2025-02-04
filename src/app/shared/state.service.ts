import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class StateService {

    maxHr = new BehaviorSubject<number>(0)
    ftp = new BehaviorSubject<number>(0)

    constructor() { }
}
