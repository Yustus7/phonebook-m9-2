import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from "../model/user";
import {Contact} from "../model/contact";


@Injectable({providedIn: 'root'})
export class ContactsService {
  private readonly contactPath = '/api/contact/';
  private readonly country_code = '/api/country_code';
  private readonly contactPhonePath = '/api/phone/';
  private readonly contactAddressPath = '/api/address/';
  private readonly contactEmailPath = '/api/email/';
  public contacts: Contact[] = []


  constructor(private http: HttpClient) {
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactPath)
      .pipe(tap(contacts => this.contacts = contacts));
  }

  removeContact(id: number) {
    return this.http.delete(this.contactPath + id)

  }
  removePhone(id: number) {
    return this.http.delete(this.contactPhonePath + id)

  }
  addContact(contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactPath,contact)
  }

  addAddress(item,contactId: number): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactAddressPath, {
        contactId: contactId,
        zip: item.zip,
        country: item.country,
        city: item.city,
        street: item.street
      })
  }
  addEmail(contact,contactId: number): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactEmailPath, {
        contactId: contactId,
        email: contact.email,
      })
  }

  getCountry_code(): Observable<Contact> {
    return this.http
      .get<Contact>(this.country_code)
  }

  getPhone(id): Observable<Contact>{
    return this.http
      .get<Contact>(this.contactPhonePath + '/' + id)
  }

  updatePhone(contact,phoneId: number, country_code){
    return this.http
      .put<Contact>(this.contactPhonePath,{
        id: phoneId,
        countryCode: country_code,
        phoneNumber: contact.phoneNumber,
        contactId: contact.id,
      })
  }


  addPhone(contact,contactId: number, country_code): Observable<Contact> {
    return this.http
      .post<Contact>(this.contactPhonePath, {
        contactId: contactId,
        countryCode: country_code,
        phoneNumber: contact.phoneNumber,

      })
  }

  getContactById(id): Observable<Contact> {
    return this.http
      .get<Contact>(this.contactPath + '/' + id)
  }
}

