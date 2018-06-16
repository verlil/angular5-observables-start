import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumbers = Observable.interval(1000);
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );
    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.complete();
        }, 2000);
        setTimeout(() => {
          observer.next('first package');
          // next - emits a normal data package
        }, 1000);
        setTimeout(() => {
          observer.next('second package');
        }, 2000);
        setTimeout(() => {
          observer.error('error message');
        }, 3000);
      }
    );
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('done');
      }
    );
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
    this.numbersObsSubscription.unsubscribe();
  }

}
