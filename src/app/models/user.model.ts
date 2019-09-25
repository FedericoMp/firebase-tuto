export interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: StringConstructor;
  myCustomData?: string;
}
