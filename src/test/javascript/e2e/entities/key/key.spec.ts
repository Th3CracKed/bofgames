/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KeyComponentsPage, KeyDeleteDialog, KeyUpdatePage } from './key.page-object';

const expect = chai.expect;

describe('Key e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let keyUpdatePage: KeyUpdatePage;
  let keyComponentsPage: KeyComponentsPage;
  let keyDeleteDialog: KeyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Keys', async () => {
    await navBarPage.goToEntity('key');
    keyComponentsPage = new KeyComponentsPage();
    await browser.wait(ec.visibilityOf(keyComponentsPage.title), 5000);
    expect(await keyComponentsPage.getTitle()).to.eq('bofGamesApp.key.home.title');
  });

  it('should load create Key page', async () => {
    await keyComponentsPage.clickOnCreateButton();
    keyUpdatePage = new KeyUpdatePage();
    expect(await keyUpdatePage.getPageTitle()).to.eq('bofGamesApp.key.home.createOrEditLabel');
    await keyUpdatePage.cancel();
  });

  it('should create and save Keys', async () => {
    const nbButtonsBeforeCreate = await keyComponentsPage.countDeleteButtons();

    await keyComponentsPage.clickOnCreateButton();
    await promise.all([keyUpdatePage.setValueInput('value'), keyUpdatePage.itemSelectLastOption()]);
    expect(await keyUpdatePage.getValueInput()).to.eq('value', 'Expected Value value to be equals to value');
    await keyUpdatePage.save();
    expect(await keyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await keyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Key', async () => {
    const nbButtonsBeforeDelete = await keyComponentsPage.countDeleteButtons();
    await keyComponentsPage.clickOnLastDeleteButton();

    keyDeleteDialog = new KeyDeleteDialog();
    expect(await keyDeleteDialog.getDialogTitle()).to.eq('bofGamesApp.key.delete.question');
    await keyDeleteDialog.clickOnConfirmButton();

    expect(await keyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
