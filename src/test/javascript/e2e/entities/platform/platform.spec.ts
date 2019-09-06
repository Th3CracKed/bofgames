/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlatformComponentsPage, PlatformDeleteDialog, PlatformUpdatePage } from './platform.page-object';

const expect = chai.expect;

describe('Platform e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let platformUpdatePage: PlatformUpdatePage;
  let platformComponentsPage: PlatformComponentsPage;
  let platformDeleteDialog: PlatformDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Platforms', async () => {
    await navBarPage.goToEntity('platform');
    platformComponentsPage = new PlatformComponentsPage();
    await browser.wait(ec.visibilityOf(platformComponentsPage.title), 5000);
    expect(await platformComponentsPage.getTitle()).to.eq('bofGamesApp.platform.home.title');
  });

  it('should load create Platform page', async () => {
    await platformComponentsPage.clickOnCreateButton();
    platformUpdatePage = new PlatformUpdatePage();
    expect(await platformUpdatePage.getPageTitle()).to.eq('bofGamesApp.platform.home.createOrEditLabel');
    await platformUpdatePage.cancel();
  });

  it('should create and save Platforms', async () => {
    const nbButtonsBeforeCreate = await platformComponentsPage.countDeleteButtons();

    await platformComponentsPage.clickOnCreateButton();
    await promise.all([platformUpdatePage.setNameInput('name')]);
    expect(await platformUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await platformUpdatePage.save();
    expect(await platformUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await platformComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Platform', async () => {
    const nbButtonsBeforeDelete = await platformComponentsPage.countDeleteButtons();
    await platformComponentsPage.clickOnLastDeleteButton();

    platformDeleteDialog = new PlatformDeleteDialog();
    expect(await platformDeleteDialog.getDialogTitle()).to.eq('bofGamesApp.platform.delete.question');
    await platformDeleteDialog.clickOnConfirmButton();

    expect(await platformComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
