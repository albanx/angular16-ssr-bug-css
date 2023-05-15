import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.scss']
})
export class ParaComponent {
  @Input() property: string = 'default';
}
