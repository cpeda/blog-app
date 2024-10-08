import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
 @Input() title!: string;
 @Output() titleEvent: EventEmitter<string> = new EventEmitter();

 ngOnInit(): void {
  console.log(this.title);
 }
 buttonPressed(): void {
  this.titleEvent.emit('nuevo titulo');
}
}