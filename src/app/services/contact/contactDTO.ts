export class ContactDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  constructor(firstName: string, lastName: string, email: string, phone: string, message: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.message = message;
   }
}
