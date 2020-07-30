import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  withBorder = true;

  textColor = 'tomato';

  onButtonClick(){
    this.withBorder = !this.withBorder;
    this.title = 'Changed';
  }

  onTextMouseOver(){
    this.textColor = 'dodgerblue'
  }

  onTextMouseOut() {
    this.textColor = 'gray'
  }

  onButtonClickedFromHello(event: string){
    this.title = event;
  }
}
