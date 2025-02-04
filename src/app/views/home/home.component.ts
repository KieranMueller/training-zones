import { Component } from '@angular/core'
import { FtpInputComponent } from '../../components/ftp-input/ftp-input.component'
import { HeartRateInputComponent } from '../../components/heart-rate-input/heart-rate-input.component'
import { TableComponent } from '../../components/table/table.component'
import { MatTableModule } from '@angular/material/table'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FtpInputComponent, HeartRateInputComponent, TableComponent, MatTableModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
