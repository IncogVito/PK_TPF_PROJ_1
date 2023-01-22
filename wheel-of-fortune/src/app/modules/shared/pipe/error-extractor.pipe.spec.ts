import { ErrorExtractorPipe } from './error-extractor.pipe';

describe('ValidationErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorExtractorPipe();
    expect(pipe).toBeTruthy();
  });
});
