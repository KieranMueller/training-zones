import { Component, OnInit } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { StateService } from '../../shared/state.service'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [MatTableModule, CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
    ftp = 0
    maxHr = 0
    isLowerHrView = false
    displayedColumns: string[] = ['zone', 'name', 'hr', 'power', 'timeInZone', 'description'];
    dataSource = [
        { position: 1, name: 'Active Recovery', hr: '< 69%', myHr: '', ftp: '< 55%', myFtp: '', timeInZone: 'n/a', description: 'Very easy, soft pedaling, no resistance, used for recovery rides.' },
        { position: 2, name: 'Endurance', hr: '69 - 79%', myHr: '', ftp: '55 - 75%', myFtp: '', timeInZone: '1+ hrs', description: 'All-day pace, steady effort, comfortable breathing, burns fat.' },
        { position: 3, name: 'Tempo/\nSweetspot', hr: '79 - 87%', myHr: '', ftp: '75 - 90%', myFtp: '', timeInZone: '20m - 1hr', description: '"Fast group ride" effort, sustainable for a couple of hours but requires focus.' },
        { position: 4, name: 'Threshold', hr: '87 - 92%', myHr: '', ftp: '90 - 105%', myFtp: '', timeInZone: '10m - 30m', description: 'Hard effort, just below or at max sustainable for ~1 hour (FTP level).' },
        { position: 5, name: 'VO2 Max', hr: '92 - 97%', myHr: '', ftp: '105 - 120%', myFtp: '', timeInZone: '3m - 8m', description: 'Very hard, short, deep-breathing efforts.' },
        { position: 6, name: 'Anaerobic Capacity', hr: '> 97%', myHr: '', ftp: '> 120%', myFtp: '', timeInZone: '30s - 3m', description: '	Sprint efforts, full gas, high power, cannot be sustained.' },
    ]

    constructor(private stateService: StateService) { }

    ngOnInit() {
        this.stateService.maxHr.subscribe({
            next: (maxHr: number) => {
                this.maxHr = maxHr
                this.updateDataSource(this.isLowerHrView)
            }
        })
        this.stateService.ftp.subscribe({
            next: (ftp: number) => {
                this.ftp = ftp
                this.updateDataSource(this.isLowerHrView)
            }
        })
        const lowHrPref = JSON.parse(localStorage.getItem('lowHrPref')!)
        if (lowHrPref) {
            this.isLowerHrView = lowHrPref
            this.updateDataSource(this.isLowerHrView)
        }
    }

    updateDataSource(lowHrView: boolean = false) {
        if (!lowHrView) {
            this.dataSource = [
                { position: 1, name: 'Active Recovery', hr: '< 69%', myHr: `< ${Math.round(this.maxHr * .69)} bpm`, ftp: '< 55%', myFtp: `< ${Math.round(this.ftp * .55)}w`, timeInZone: 'n/a', description: 'Very easy, soft pedaling, no resistance, used for recovery rides.' },
                { position: 2, name: 'Endurance', hr: '69 - 79%', myHr: `${Math.round(this.maxHr * .69)} - ${Math.round(this.maxHr * .79)} bpm`, ftp: '55 - 75%', myFtp: `${Math.round(this.ftp * .55)} - ${Math.round(this.ftp * .75)}w`, timeInZone: '1+ hrs', description: 'All-day pace, steady effort, comfortable breathing, burns fat.' },
                { position: 3, name: 'Tempo/\nSweetspot', hr: '79 - 87%', myHr: `${Math.round(this.maxHr * .79)} - ${Math.round(this.maxHr * .87)} bpm`, ftp: '75 - 90%', myFtp: `${Math.round(this.ftp * .75)} - ${Math.round(this.ftp * .9)}w`, timeInZone: '20m - 1hr', description: '"Fast group ride" effort, sustainable for a couple of hours but requires focus.' },
                { position: 4, name: 'Threshold', hr: '87 - 92%', myHr: `${Math.round(this.maxHr * .87)} - ${Math.round(this.maxHr * .92)} bpm`, ftp: '90 - 105%', myFtp: `${Math.round(this.ftp * .9)} - ${Math.round(this.ftp * 1.05)}w`, timeInZone: '10m - 30m', description: 'Hard effort, just below or at max sustainable for ~1 hour (FTP level).' },
                { position: 5, name: 'VO2 Max', hr: '92 - 97%', myHr: `${Math.round(this.maxHr * .92)} - ${Math.round(this.maxHr * .97)} bpm`, ftp: '105 - 120%', myFtp: `${Math.round(this.ftp * 1.05)} - ${Math.round(this.ftp * 1.2)}w`, timeInZone: '3m - 8m', description: 'Very hard, short, deep-breathing efforts.' },
                { position: 6, name: 'Anaerobic Capacity', hr: '> 97%', myHr: `> ${Math.round(this.maxHr * .97)} bpm`, ftp: '> 120%', myFtp: `> ${Math.round(this.ftp * 1.2)}w`, timeInZone: '30s - 3m', description: 'Sprint efforts, full gas, high power, cannot be sustained.' },
            ]
        } else {
            this.dataSource = [
                { position: 1, name: 'Active Recovery', hr: '< 60%', myHr: `< ${Math.round(this.maxHr * .6)} bpm`, ftp: '< 55%', myFtp: `< ${Math.round(this.ftp * .55)}w`, timeInZone: 'n/a', description: 'Very easy, soft pedaling, no resistance, used for recovery rides.' },
                { position: 2, name: 'Endurance', hr: '60 - 70%', myHr: `${Math.round(this.maxHr * .6)} - ${Math.round(this.maxHr * .7)} bpm`, ftp: '55 - 75%', myFtp: `${Math.round(this.ftp * .55)} - ${Math.round(this.ftp * .75)}w`, timeInZone: '1+ hrs', description: 'All-day pace, steady effort, comfortable breathing, burns fat.' },
                { position: 3, name: 'Tempo/\nSweetspot', hr: '70 - 80%', myHr: `${Math.round(this.maxHr * .7)} - ${Math.round(this.maxHr * .8)} bpm`, ftp: '75 - 90%', myFtp: `${Math.round(this.ftp * .75)} - ${Math.round(this.ftp * .9)}w`, timeInZone: '20m - 1hr', description: '"Fast group ride" effort, sustainable for a couple of hours but requires focus.' },
                { position: 4, name: 'Threshold', hr: '80 - 90%', myHr: `${Math.round(this.maxHr * .8)} - ${Math.round(this.maxHr * .9)} bpm`, ftp: '90 - 105%', myFtp: `${Math.round(this.ftp * .9)} - ${Math.round(this.ftp * 1.05)}w`, timeInZone: '10m - 30m', description: 'Hard effort, just below or at max sustainable for ~1 hour (FTP level).' },
                { position: 5, name: 'VO2 Max', hr: '90 - 98%', myHr: `${Math.round(this.maxHr * .9)} - ${Math.round(this.maxHr * .98)} bpm`, ftp: '105 - 120%', myFtp: `${Math.round(this.ftp * 1.05)} - ${Math.round(this.ftp * 1.2)}w`, timeInZone: '3m - 8m', description: 'Very hard, short, deep-breathing efforts.' },
                { position: 6, name: 'Anaerobic Capacity', hr: '> 98%', myHr: `> ${Math.round(this.maxHr * .98)} bpm`, ftp: '> 120%', myFtp: `> ${Math.round(this.ftp * 1.2)}w`, timeInZone: '30s - 3m', description: 'Sprint efforts, full gas, high power, cannot be sustained.' },
            ]
        }
    }

    getRowClass(row: any): string {
        switch (row.position) {
            case 1:
                return 'active-recovery'
            case 2:
                return 'endurance'
            case 3:
                return 'tempo'
            case 4:
                return 'threshold'
            case 5:
                return 'vo2-max'
            case 6:
                return 'anaerobic-capacity'
            default:
                return ''
        }
    }

    toggleHrView() {
        this.isLowerHrView = !this.isLowerHrView
        this.updateDataSource(this.isLowerHrView)
        localStorage.setItem('lowHrPref', JSON.stringify(this.isLowerHrView))
    }
}
