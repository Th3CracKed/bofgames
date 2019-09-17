import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CartComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cart div table .btn-danger'));
  title = element.all(by.css('jhi-cart div h2#page-heading span')).first();

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

export class CartUpdatePage {
  pageTitle = element(by.id('jhi-cart-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  expiredInput = element(by.id('field_expired'));
  orderedInput = element(by.id('field_ordered'));
  driverSelect = element(by.id('field_driver'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getExpiredInput(timeout?: number) {
    return this.expiredInput;
  }
  getOrderedInput(timeout?: number) {
    return this.orderedInput;
  }

  async driverSelectLastOption(timeout?: number) {
    await this.driverSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async driverSelectOption(option) {
    await this.driverSelect.sendKeys(option);
  }

  getDriverSelect(): ElementFinder {
    return this.driverSelect;
  }

  async getDriverSelectedOption() {
    return await this.driverSelect.element(by.css('option:checked')).getText();
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

export class CartDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cart-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cart'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
