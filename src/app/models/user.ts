import { Adapter } from "./shared/adapter";
import { Injectable } from "@angular/core";

export class User {
  constructor(
    public name?: string,
    public id?: number,
    public phone?: string,
    public nationalId?: string,
    public hrUserId?: number
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return new User(
      item.name,
      item.id,
      item.phone,
      item.nat_id,
      item.hr_user_id
    );
  }
}
