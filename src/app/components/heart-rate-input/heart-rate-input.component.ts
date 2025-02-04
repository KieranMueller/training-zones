import { Component, OnInit } from '@angular/core'
import { StateService } from '../../shared/state.service'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-heart-rate-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './heart-rate-input.component.html',
    styleUrl: './heart-rate-input.component.scss'
})
export class HeartRateInputComponent implements OnInit {

    maxHr: number | null = null

    constructor(private stateService: StateService) { }

    ngOnInit(): void {
        const maxHr = JSON.parse(localStorage.getItem('maxHr')!)
        if (maxHr) {
            this.maxHr = maxHr
            this.updateMaxHr({ target: { value: maxHr } })
        }
    }

    updateMaxHr(event: any) {
        const maxHr = event.target.value
        this.stateService.maxHr.next(maxHr)
        localStorage.setItem('maxHr', JSON.stringify(maxHr))
    }

}
