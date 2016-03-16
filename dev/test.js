import { test } from './modules/utils';
import './bbslider.es6';

describe('Test1', function () {
  it('should pass', function () {
    expect(true).toBe(true);
  });
});

describe('Test2', function () {
  it('should pass', function () {
    var result = test();
    expect(result).toBe('testStr');
  });
});