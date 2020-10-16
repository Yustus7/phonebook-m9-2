
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Contact} from "../../model/contact";
import {ContactsService} from "../../service/contact.service";



@Component({
  selector: 'app-student-edit',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  id: number;
  contact: Contact;
  addresses: any;
  phoneNumbers: any;
  emails: string;
  email: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public contactsService : ContactsService
  ) {
    this.contact = new Contact();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.contactsService.getContactById(this.id).subscribe(response => {
      console.log(response);
      this.contact = response;
      this.addresses = this.contact.addresses;
      this.phoneNumbers = this.contact.phoneNumbers;
      this.emails = this.contact.emails;

    });
  }



}
