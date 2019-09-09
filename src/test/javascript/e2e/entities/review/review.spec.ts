/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReviewComponentsPage, ReviewDeleteDialog, ReviewUpdatePage } from './review.page-object';

const expect = chai.expect;

describe('Review e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reviewUpdatePage: ReviewUpdatePage;
  let reviewComponentsPage: ReviewComponentsPage;
  let reviewDeleteDialog: ReviewDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reviews', async () => {
    await navBarPage.goToEntity('review');
    reviewComponentsPage = new ReviewComponentsPage();
    await browser.wait(ec.visibilityOf(reviewComponentsPage.title), 5000);
    expect(await reviewComponentsPage.getTitle()).to.eq('bofgamesApp.review.home.title');
  });

  it('should load create Review page', async () => {
    await reviewComponentsPage.clickOnCreateButton();
    reviewUpdatePage = new ReviewUpdatePage();
    expect(await reviewUpdatePage.getPageTitle()).to.eq('bofgamesApp.review.home.createOrEditLabel');
    await reviewUpdatePage.cancel();
  });

  it('should create and save Reviews', async () => {
    const nbButtonsBeforeCreate = await reviewComponentsPage.countDeleteButtons();

    await reviewComponentsPage.clickOnCreateButton();
    await promise.all([
      reviewUpdatePage.setMarkInput('5'),
      reviewUpdatePage.setCommentInput('comment'),
      reviewUpdatePage.gameSelectLastOption(),
      reviewUpdatePage.clientSelectLastOption()
    ]);
    expect(await reviewUpdatePage.getMarkInput()).to.eq('5', 'Expected mark value to be equals to 5');
    expect(await reviewUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    await reviewUpdatePage.save();
    expect(await reviewUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Review', async () => {
    const nbButtonsBeforeDelete = await reviewComponentsPage.countDeleteButtons();
    await reviewComponentsPage.clickOnLastDeleteButton();

    reviewDeleteDialog = new ReviewDeleteDialog();
    expect(await reviewDeleteDialog.getDialogTitle()).to.eq('bofgamesApp.review.delete.question');
    await reviewDeleteDialog.clickOnConfirmButton();

    expect(await reviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
