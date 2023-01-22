export class StringUtilService {
  public static isStringEmpty(text: string): boolean {
    return !text || text.length === 0;
  }

  public static isStringNotEmpty(text: string): boolean {
    return !this.isStringEmpty(text);
  }

  public static getLastChar(text: string) {
    if (this.isStringEmpty(text)) {
      return '';
    } else {
      return text[text.length - 1];
    }
  }

  public static getFirstChar(text: string) {
    if (this.isStringEmpty(text)) {
      return '';
    } else {
      return text[0];
    }
  }

  public static getFirstChars(text: string, limit: number) {
    if (this.isStringEmpty(text)) {
      return '';
    } else {
      return text.slice(0, limit);
    }
  }

  public static getLength(text: string): number {
    if (this.isStringEmpty(text)) {
      return 0;
    }
    return text.length;
  }

  public static convertNumberToStringDecimal(value: number, zerosAfterDot: number): string {
    const convertedValue = String(value);
    return convertedValue.includes('.') ? convertedValue : convertedValue + (zerosAfterDot ? ',' : '') + '0'.repeat(zerosAfterDot);
  }
}
