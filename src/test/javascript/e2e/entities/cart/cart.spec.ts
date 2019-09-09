/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CartComponentsPage, CartDeleteDialog, CartUpdatePage } from './cart.page-object';

const expect = chai.expect;

describe('Cart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartUpdatePage: CartUpdatePage;
  let cartComponentsPage: CartComponentsPage;
  let cartDeleteDialog: CartDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Carts', async () => {
    await navBarPage.goToEntity('cart');
    cartComponentsPage = new CartComponentsPage();
    await browser.wait(ec.visibilityOf(cartComponentsPage.title), 5000);
    expect(await cartComponentsPage.getTitle()).to.eq('bofgamesApp.cart.home.title');
  });

  it('should load create Cart page', async () => {
    await cartComponentsPage.clickOnCreateButton();
    cartUpdatePage = new CartUpdatePage();
    expect(await cartUpdatePage.getPageTitle()).to.eq('bofgamesApp.cart.home.createOrEditLabel');
    await cartUpdatePage.cancel();
  });

  it('should create and save Carts', async () => {
    const nbButtonsBeforeCreate = await cartComponentsPage.countDeleteButtons();

    await cartComponentsPage.clickOnCreateButton();
    await promise.all([]);
    const selectedExpired = cartUpdatePage.getExpiredInput();
    if (await selectedExpired.isSelected()) {
      await cartUpdatePage.getExpiredInput().click();
      expect(await cartUpdatePage.getExpiredInput().isSelected(), 'Expected expired not to be selected').to.be.false;
    } else {
      await cartUpdatePage.getExpiredInput().click();
      expect(await cartUpdatePage.getExpiredInput().isSelected(), 'Expected expired to be selected').to.be.true;
    }
    await cartUpdatePage.save();
    expect(await cartUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cart', async () => {
    const nbButtonsBeforeDelete = await cartComponentsPage.countDeleteButtons();
    await cartComponentsPage.clickOnLastDeleteButton();

    cartDeleteDialog = new CartDeleteDialog();
    expect(await cartDeleteDialog.getDialogTitle()).to.eq('bofgamesApp.cart.delete.question');
    await cartDeleteDialog.clickOnConfirmButton();

    expect(await cartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
