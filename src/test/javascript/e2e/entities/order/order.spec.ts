/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderComponentsPage: OrderComponentsPage;
  let orderDeleteDialog: OrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Orders', async () => {
    await navBarPage.goToEntity('order');
    orderComponentsPage = new OrderComponentsPage();
    await browser.wait(ec.visibilityOf(orderComponentsPage.title), 5000);
    expect(await orderComponentsPage.getTitle()).to.eq('bofGamesApp.order.home.title');
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle()).to.eq('bofGamesApp.order.home.createOrEditLabel');
    await orderUpdatePage.cancel();
  });

  it('should create and save Orders', async () => {
    const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

    await orderComponentsPage.clickOnCreateButton();
    await promise.all([
      orderUpdatePage.setFirstNameInput('firstName'),
      orderUpdatePage.setLastNameInput('lastName'),
      orderUpdatePage.setEmailInput('email'),
      orderUpdatePage.setStreetInput('street'),
      orderUpdatePage.setPostcodeInput('postcode'),
      orderUpdatePage.setCityInput('city'),
      orderUpdatePage.setCountryInput('country'),
      orderUpdatePage.setItemsInput('items'),
      orderUpdatePage.clientSelectLastOption()
    ]);
    expect(await orderUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await orderUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await orderUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await orderUpdatePage.getStreetInput()).to.eq('street', 'Expected Street value to be equals to street');
    expect(await orderUpdatePage.getPostcodeInput()).to.eq('postcode', 'Expected Postcode value to be equals to postcode');
    expect(await orderUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await orderUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    expect(await orderUpdatePage.getItemsInput()).to.eq('items', 'Expected Items value to be equals to items');
    await orderUpdatePage.save();
    expect(await orderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Order', async () => {
    const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
    await orderComponentsPage.clickOnLastDeleteButton();

    orderDeleteDialog = new OrderDeleteDialog();
    expect(await orderDeleteDialog.getDialogTitle()).to.eq('bofGamesApp.order.delete.question');
    await orderDeleteDialog.clickOnConfirmButton();

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
