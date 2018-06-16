import {Subject} from 'rxjs/Subject';

export class UsersService {
  userActivated = new Subject();
  // Subject - is an observable and an observer at the same time
}
