
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-internet-alert',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './internet-alert.component.html',
})
export class InternetAlertComponent {

  internetStatus:boolean = false;

}
