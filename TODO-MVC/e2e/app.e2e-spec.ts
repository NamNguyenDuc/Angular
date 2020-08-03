import { TODOMVCPage } from './app.po';

describe('todo-mvc App', function() {
  let page: TODOMVCPage;

  beforeEach(() => {
    page = new TODOMVCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
