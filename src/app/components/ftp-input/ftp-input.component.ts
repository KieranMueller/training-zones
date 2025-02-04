import { Component, OnInit } from '@angular/core'
import { StateService } from '../../shared/state.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-ftp-input',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './ftp-input.component.html',
    styleUrl: './ftp-input.component.scss'
})
export class FtpInputComponent implements OnInit {
    ftp: number | null = null
    wkg: number = 0
    bw = JSON.parse(localStorage.getItem('bw')!) || 0

    constructor(private stateService: StateService) { }

    ngOnInit(): void {
        console.log('hey')
        const ftp = JSON.parse(localStorage.getItem('ftp')!)
        if (ftp) {
            this.ftp = ftp
            this.updateFtp({ target: { value: ftp } })
        }
    }

    updateFtp(event: any) {
        const ftp = event.target.value
        this.stateService.ftp.next(ftp)
        localStorage.setItem('ftp', JSON.stringify(ftp))
        this.updateWkg()
    }

    updateWkg() {
        this.wkg = parseFloat((this.ftp! / (this.bw * 0.453592)).toFixed(2))
        localStorage.setItem('bw', JSON.stringify(this.bw))
    }

    isFinite(value: number) {
        return Number.isFinite(value)
    }

    calculateWkgColor(): string {
        if (!this.isFinite(this.wkg)) return ''
        if (this.wkg > 5) return 'gold'
        else if (this.wkg > 4) return 'orange'
        else if (this.wkg > 3) return 'green'
        else if (this.wkg > 2) return 'blue'
        return ''
    }
}
