/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GameComponentsPage, GameDeleteDialog, GameUpdatePage } from './game.page-object';

const expect = chai.expect;

describe('Game e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let gameUpdatePage: GameUpdatePage;
  let gameComponentsPage: GameComponentsPage;
  let gameDeleteDialog: GameDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Games', async () => {
    await navBarPage.goToEntity('game');
    gameComponentsPage = new GameComponentsPage();
    await browser.wait(ec.visibilityOf(gameComponentsPage.title), 5000);
    expect(await gameComponentsPage.getTitle()).to.eq('bofgamesApp.game.home.title');
  });

  it('should load create Game page', async () => {
    await gameComponentsPage.clickOnCreateButton();
    gameUpdatePage = new GameUpdatePage();
    expect(await gameUpdatePage.getPageTitle()).to.eq('bofgamesApp.game.home.createOrEditLabel');
    await gameUpdatePage.cancel();
  });

  it('should create and save Games', async () => {
    const nbButtonsBeforeCreate = await gameComponentsPage.countDeleteButtons();

    await gameComponentsPage.clickOnCreateButton();
    await promise.all([gameUpdatePage.setNameInput('name'), gameUpdatePage.setDescriptionInput('description')]);
    expect(await gameUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await gameUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    await gameUpdatePage.save();
    expect(await gameUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await gameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Game', async () => {
    const nbButtonsBeforeDelete = await gameComponentsPage.countDeleteButtons();
    await gameComponentsPage.clickOnLastDeleteButton();

    gameDeleteDialog = new GameDeleteDialog();
    expect(await gameDeleteDialog.getDialogTitle()).to.eq('bofgamesApp.game.delete.question');
    await gameDeleteDialog.clickOnConfirmButton();

    expect(await gameComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
