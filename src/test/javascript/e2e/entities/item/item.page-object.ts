import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item div table .btn-danger'));
  title = element.all(by.css('jhi-item div h2#page-heading span')).first();

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

export class ItemUpdatePage {
  pageTitle = element(by.id('jhi-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  priceInput = element(by.id('field_price'));
  isBuyableInput = element(by.id('field_isBuyable'));
  gameSelect = element(by.id('field_game'));
  platformSelect = element(by.id('field_platform'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return await this.priceInput.getAttribute('value');
  }

  getIsBuyableInput(timeout?: number) {
    return this.isBuyableInput;
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

  async platformSelectLastOption(timeout?: number) {
    await this.platformSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async platformSelectOption(option) {
    await this.platformSelect.sendKeys(option);
  }

  getPlatformSelect(): ElementFinder {
    return this.platformSelect;
  }

  async getPlatformSelectedOption() {
    return await this.platformSelect.element(by.css('option:checked')).getText();
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

export class ItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-item-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-item'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
