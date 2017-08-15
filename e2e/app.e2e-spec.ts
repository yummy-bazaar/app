import { YbNgPage } from './app.po';

describe('yb-ng App', () => {
  let page: YbNgPage;

  beforeEach(() => {
    page = new YbNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
