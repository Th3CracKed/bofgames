import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ReviewComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-review div table .btn-danger'));
  title = element.all(by.css('jhi-review div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ReviewUpdatePage {
  pageTitle = element(by.id('jhi-review-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  markInput = element(by.id('field_mark'));
  commentInput = element(by.id('field_comment'));
  gameSelect = element(by.id('field_game'));
  clientSelect = element(by.id('field_client'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMarkInput(mark) {
    await this.markInput.sendKeys(mark);
  }

  async getMarkInput() {
    return await this.markInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return await this.commentInput.getAttribute('value');
  }

  async gameSelectLastOption(timeout?: number) {
    await this.gameSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async gameSelectOption(option) {
    await this.gameSelect.sendKeys(option);
  }

  getGameSelect(): ElementFinder {
    return this.gameSelect;
  }

  async getGameSelectedOption() {
    return await this.gameSelect.element(by.css('option:checked')).getText();
  }

  async clientSelectLastOption(timeout?: number) {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option) {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption() {
    return await this.clientSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ReviewDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-review-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-review'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
