import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PromoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-promo div table .btn-danger'));
  title = element.all(by.css('jhi-promo div h2#page-heading span')).first();

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

export class PromoUpdatePage {
  pageTitle = element(by.id('jhi-promo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  saleInput = element(by.id('field_sale'));
  startInput = element(by.id('field_start'));
  endInput = element(by.id('field_end'));
  itemSelect = element(by.id('field_item'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSaleInput(sale) {
    await this.saleInput.sendKeys(sale);
  }

  async getSaleInput() {
    return await this.saleInput.getAttribute('value');
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return await this.startInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return await this.endInput.getAttribute('value');
  }

  async itemSelectLastOption(timeout?: number) {
    await this.itemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async itemSelectOption(option) {
    await this.itemSelect.sendKeys(option);
  }

  getItemSelect(): ElementFinder {
    return this.itemSelect;
  }

  async getItemSelectedOption() {
    return await this.itemSelect.element(by.css('option:checked')).getText();
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

export class PromoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-promo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-promo'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
