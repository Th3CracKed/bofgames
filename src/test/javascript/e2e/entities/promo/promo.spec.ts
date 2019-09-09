/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PromoComponentsPage, PromoDeleteDialog, PromoUpdatePage } from './promo.page-object';

const expect = chai.expect;

describe('Promo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let promoUpdatePage: PromoUpdatePage;
  let promoComponentsPage: PromoComponentsPage;
  let promoDeleteDialog: PromoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Promos', async () => {
    await navBarPage.goToEntity('promo');
    promoComponentsPage = new PromoComponentsPage();
    await browser.wait(ec.visibilityOf(promoComponentsPage.title), 5000);
    expect(await promoComponentsPage.getTitle()).to.eq('bofgamesApp.promo.home.title');
  });

  it('should load create Promo page', async () => {
    await promoComponentsPage.clickOnCreateButton();
    promoUpdatePage = new PromoUpdatePage();
    expect(await promoUpdatePage.getPageTitle()).to.eq('bofgamesApp.promo.home.createOrEditLabel');
    await promoUpdatePage.cancel();
  });

  it('should create and save Promos', async () => {
    const nbButtonsBeforeCreate = await promoComponentsPage.countDeleteButtons();

    await promoComponentsPage.clickOnCreateButton();
    await promise.all([
      promoUpdatePage.setSaleInput('5'),
      promoUpdatePage.setStartInput('2000-12-31'),
      promoUpdatePage.setEndInput('2000-12-31'),
      promoUpdatePage.itemSelectLastOption()
    ]);
    expect(await promoUpdatePage.getSaleInput()).to.eq('5', 'Expected sale value to be equals to 5');
    expect(await promoUpdatePage.getStartInput()).to.eq('2000-12-31', 'Expected start value to be equals to 2000-12-31');
    expect(await promoUpdatePage.getEndInput()).to.eq('2000-12-31', 'Expected end value to be equals to 2000-12-31');
    await promoUpdatePage.save();
    expect(await promoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await promoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Promo', async () => {
    const nbButtonsBeforeDelete = await promoComponentsPage.countDeleteButtons();
    await promoComponentsPage.clickOnLastDeleteButton();

    promoDeleteDialog = new PromoDeleteDialog();
    expect(await promoDeleteDialog.getDialogTitle()).to.eq('bofgamesApp.promo.delete.question');
    await promoDeleteDialog.clickOnConfirmButton();

    expect(await promoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
