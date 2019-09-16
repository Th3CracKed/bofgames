import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService, JhiLanguageHelper } from 'app/core';
import { Client, IClient } from 'app/shared/model/client.model';
import { concat, Observable } from 'rxjs';
import { ClientService } from 'app/entities/client';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  error: string;
  success: string;
  languages: any[];
  settingsForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [false],
    authorities: [[]],
    langKey: ['en'],
    login: [],
    imageUrl: [],
    id: [],
    street: [],
    postCode: [],
    city: [],
    country: [],
    birthdate: [],
    user: []
  });
  hasClient = true;
  birthdateDp: any;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    //private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.updateForm(account);
      this.getClientAndUpdate(account.id);
    });
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  save() {
    const settingsAccount = this.accountFromForm();
    let settingsClient: IClient;
    if (this.hasClient) {
      settingsClient = this.clientFromForm();
    }
    this.fillForm(settingsAccount, settingsClient).subscribe(
      () => {
        this.error = null;
        this.success = 'OK';
        this.accountService.identity(true).then(account => {
          this.updateForm(account);
          if (this.hasClient) {
            this.getClientAndUpdate(account.id);
          }
        });
        /*this.languageService.getCurrent().then(current => {
            if (settingsAccount.langKey !== current) {
              this.languageService.changeLanguage(settingsAccount.langKey);
            }
          });*/
      },
      () => {
        this.success = null;
        this.error = 'ERROR';
      }
    );
  }

  private fillForm(settingsAccount: Account, settingsClient: IClient): Observable<any> {
    let obs: Observable<HttpResponse<any>>;
    if (this.hasClient) {
      obs = concat(this.accountService.save(settingsAccount), this.clientService.update(settingsClient));
    } else {
      obs = this.accountService.save(settingsAccount);
    }

    return obs;
  }

  private accountFromForm(): any {
    const account = {};
    return {
      ...account,
      firstName: this.settingsForm.get('firstName').value,
      lastName: this.settingsForm.get('lastName').value,
      email: this.settingsForm.get('email').value,
      activated: this.settingsForm.get('activated').value,
      authorities: this.settingsForm.get('authorities').value,
      //langKey: this.settingsForm.get('langKey').value,
      login: this.settingsForm.get('login').value,
      imageUrl: this.settingsForm.get('imageUrl').value
    };
  }

  updateForm(account: any): void {
    this.settingsForm.patchValue({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      activated: account.activated,
      authorities: account.authorities,
      langKey: account.langKey,
      login: account.login,
      imageUrl: account.imageUrl
    });
  }

  private clientFromForm(): any {
    return {
      ...new Client(),
      id: this.settingsForm.get(['id']).value,
      street: this.settingsForm.get(['street']).value,
      postCode: this.settingsForm.get(['postCode']).value,
      city: this.settingsForm.get(['city']).value,
      country: this.settingsForm.get(['country']).value,
      birthdate: this.settingsForm.get(['birthdate']).value,
      user: this.settingsForm.get(['user']).value
    };
  }

  updateFormWithClient(client: IClient): void {
    console.log(`client.birthdate = ${client.birthdate}`);
    this.settingsForm.patchValue({
      id: client.id,
      street: client.street,
      postCode: client.postCode,
      city: client.city,
      country: client.country,
      birthdate: client.birthdate,
      user: client.user
    });
  }

  private getClientAndUpdate(id: number) {
    this.clientService
      .find(id)
      .pipe(
        filter((response: HttpResponse<Client>) => response.ok),
        map((client: HttpResponse<Client>) => client.body)
      )
      .subscribe(
        client => {
          this.updateFormWithClient(client);
        },
        error => {
          console.log(error);
          this.hasClient = false;
        }
      );
  }
}
