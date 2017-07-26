export class Identity {
  _id: String;
  display_name: String;
  addr_street: String;
  addr_zip: String;
  addr_city: String;
  email: String;

  constructor(object, _id) {
    this.display_name = object.display_name;
    this.addr_street = object.addr_street;
    this.addr_zip = object.addr_zip;
    this.addr_city = object.addr_city;
    this.email = object.email;
    this._id = _id;
  }

}
