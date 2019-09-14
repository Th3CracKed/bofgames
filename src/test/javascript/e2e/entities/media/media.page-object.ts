import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MediaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-media div table .btn-danger'));
  title = element.all(by.css('jhi-media div h2#page-heading span')).first();

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

export class MediaUpdatePage {
  pageTitle = element(by.id('jhi-media-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  urlInput = element(by.id('field_url'));
  typeSelect = element(by.id('field_type'));
  altInput = element(by.id('field_alt'));
  gameSelect = element(by.id('field_game'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return await this.urlInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(timeout?: number) {
    await this.typeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setAltInput(alt) {
    await this.altInput.sendKeys(alt);
  }

  async getAltInput() {
    return await this.altInput.getAttribute('value');
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

export class MediaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-media-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-media'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
