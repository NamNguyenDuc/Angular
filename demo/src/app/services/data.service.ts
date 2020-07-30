import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class DataService {
  private _textFromHelloSubject: BehaviorSubject<string> = new BehaviorSubject<string>('')

  textFromHello$: Observable<string> = this._textFromHelloSubject.asObservable()

  // private _textFromHello: string;

  // get textFromHello(): string{
  //   return this._textFromHello;
  // }

  setTextFromHello(text: string){
    this._textFromHelloSubject.next(text);
  }

}
