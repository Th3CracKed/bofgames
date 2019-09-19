import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/entities/client';
import { AccountService } from 'app/core';
import { IClient, Client } from 'app/shared/model/client.model';
import { FormBuilder } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.scss']
})
export class AddressUpdateComponent implements OnInit {
  error: string;
  success: string;
  client: Client;
  isEditForm = false;
  clientForm = this.fb.group({
    id: [],
    street: [],
    postCode: [],
    city: [],
    country: [],
    birthdate: [],
    user: []
  });

  constructor(private accountService: AccountService, private fb: FormBuilder, private clientService: ClientService) {}

  ngOnInit() {
    this.getClientAndUpdate();
  }

  toogleEditForm() {
    this.isEditForm = !this.isEditForm;
    this.updateFormWithClient(this.client);
  }

  save() {
    const client = this.clientFromForm();
    this.clientService.update(client).subscribe(
      () => {
        this.getClientAndUpdate();
        this.toogleEditForm();
        this.error = null;
        this.success = 'OK';
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  private getClientAndUpdate() {
    this.accountService.identity().then(account => {
      this.clientService
        .find(account.id)
        .pipe(
          filter((response: HttpResponse<Client>) => response.ok),
          map((client: HttpResponse<Client>) => client.body)
        )
        .subscribe(
          client => {
            this.client = client;
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  private updateFormWithClient(client: IClient): void {
    this.clientForm.patchValue({
      id: client.id,
      street: client.street,
      postCode: client.postCode,
      city: client.city,
      country: client.country,
      birthdate: client.birthdate,
      user: client.user
    });
  }

  private clientFromForm(): any {
    return {
      ...new Client(),
      id: this.clientForm.get(['id']).value,
      street: this.clientForm.get(['street']).value,
      postCode: this.clientForm.get(['postCode']).value,
      city: this.clientForm.get(['city']).value,
      country: this.clientForm.get(['country']).value,
      birthdate: this.clientForm.get(['birthdate']).value,
      user: this.clientForm.get(['user']).value
    };
  }
}
