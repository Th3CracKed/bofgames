import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class CartLineComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cart-line div table .btn-danger'));
  title = element.all(by.css('jhi-cart-line div h2#page-heading span')).first();

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

export class CartLineUpdatePage {
  pageTitle = element(by.id('jhi-cart-line-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  quantityInput = element(by.id('field_quantity'));
  unitPriceInput = element(by.id('field_unitPrice'));
  expiredInput = element(by.id('field_expired'));
  cartSelect = element(by.id('field_cart'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setQuantityInput(quantity) {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput() {
    return await this.quantityInput.getAttribute('value');
  }

  async setUnitPriceInput(unitPrice) {
    await this.unitPriceInput.sendKeys(unitPrice);
  }

  async getUnitPriceInput() {
    return await this.unitPriceInput.getAttribute('value');
  }

  getExpiredInput(timeout?: number) {
    return this.expiredInput;
  }

  async cartSelectLastOption(timeout?: number) {
    await this.cartSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cartSelectOption(option) {
    await this.cartSelect.sendKeys(option);
  }

  getCartSelect(): ElementFinder {
    return this.cartSelect;
  }

  async getCartSelectedOption() {
    return await this.cartSelect.element(by.css('option:checked')).getText();
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

export class CartLineDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cartLine-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cartLine'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
