/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clientUpdatePage: ClientUpdatePage;
  let clientComponentsPage: ClientComponentsPage;
  /*let clientDeleteDialog: ClientDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clients', async () => {
    await navBarPage.goToEntity('client');
    clientComponentsPage = new ClientComponentsPage();
    await browser.wait(ec.visibilityOf(clientComponentsPage.title), 5000);
    expect(await clientComponentsPage.getTitle()).to.eq('bofgamesApp.client.home.title');
  });

  it('should load create Client page', async () => {
    await clientComponentsPage.clickOnCreateButton();
    clientUpdatePage = new ClientUpdatePage();
    expect(await clientUpdatePage.getPageTitle()).to.eq('bofgamesApp.client.home.createOrEditLabel');
    await clientUpdatePage.cancel();
  });

  /* it('should create and save Clients', async () => {
        const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

        await clientComponentsPage.clickOnCreateButton();
        await promise.all([
            clientUpdatePage.setStreetInput('street'),
            clientUpdatePage.setPostCodeInput('postCode'),
            clientUpdatePage.setCityInput('city'),
            clientUpdatePage.setCountryInput('country'),
            clientUpdatePage.setBirthdateInput('2000-12-31'),
            clientUpdatePage.cartSelectLastOption(),
            clientUpdatePage.userSelectLastOption(),
        ]);
        expect(await clientUpdatePage.getStreetInput()).to.eq('street', 'Expected Street value to be equals to street');
        expect(await clientUpdatePage.getPostCodeInput()).to.eq('postCode', 'Expected PostCode value to be equals to postCode');
        expect(await clientUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
        expect(await clientUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
        expect(await clientUpdatePage.getBirthdateInput()).to.eq('2000-12-31', 'Expected birthdate value to be equals to 2000-12-31');
        await clientUpdatePage.save();
        expect(await clientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Client', async () => {
        const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
        await clientComponentsPage.clickOnLastDeleteButton();

        clientDeleteDialog = new ClientDeleteDialog();
        expect(await clientDeleteDialog.getDialogTitle())
            .to.eq('bofgamesApp.client.delete.question');
        await clientDeleteDialog.clickOnConfirmButton();

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
