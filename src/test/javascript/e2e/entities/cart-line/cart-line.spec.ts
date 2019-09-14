/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CartLineComponentsPage, CartLineDeleteDialog, CartLineUpdatePage } from './cart-line.page-object';

const expect = chai.expect;

describe('CartLine e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cartLineUpdatePage: CartLineUpdatePage;
  let cartLineComponentsPage: CartLineComponentsPage;
  let cartLineDeleteDialog: CartLineDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CartLines', async () => {
    await navBarPage.goToEntity('cart-line');
    cartLineComponentsPage = new CartLineComponentsPage();
    await browser.wait(ec.visibilityOf(cartLineComponentsPage.title), 5000);
    expect(await cartLineComponentsPage.getTitle()).to.eq('bofgamesApp.cartLine.home.title');
  });

  it('should load create CartLine page', async () => {
    await cartLineComponentsPage.clickOnCreateButton();
    cartLineUpdatePage = new CartLineUpdatePage();
    expect(await cartLineUpdatePage.getPageTitle()).to.eq('bofgamesApp.cartLine.home.createOrEditLabel');
    await cartLineUpdatePage.cancel();
  });

  it('should create and save CartLines', async () => {
    const nbButtonsBeforeCreate = await cartLineComponentsPage.countDeleteButtons();

    await cartLineComponentsPage.clickOnCreateButton();
    await promise.all([
      cartLineUpdatePage.setQuantityInput('5'),
      cartLineUpdatePage.setUnitPriceInput('5'),
      cartLineUpdatePage.cartSelectLastOption()
    ]);
    expect(await cartLineUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await cartLineUpdatePage.getUnitPriceInput()).to.eq('5', 'Expected unitPrice value to be equals to 5');
    const selectedExpired = cartLineUpdatePage.getExpiredInput();
    if (await selectedExpired.isSelected()) {
      await cartLineUpdatePage.getExpiredInput().click();
      expect(await cartLineUpdatePage.getExpiredInput().isSelected(), 'Expected expired not to be selected').to.be.false;
    } else {
      await cartLineUpdatePage.getExpiredInput().click();
      expect(await cartLineUpdatePage.getExpiredInput().isSelected(), 'Expected expired to be selected').to.be.true;
    }
    await cartLineUpdatePage.save();
    expect(await cartLineUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cartLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CartLine', async () => {
    const nbButtonsBeforeDelete = await cartLineComponentsPage.countDeleteButtons();
    await cartLineComponentsPage.clickOnLastDeleteButton();

    cartLineDeleteDialog = new CartLineDeleteDialog();
    expect(await cartLineDeleteDialog.getDialogTitle()).to.eq('bofgamesApp.cartLine.delete.question');
    await cartLineDeleteDialog.clickOnConfirmButton();

    expect(await cartLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
