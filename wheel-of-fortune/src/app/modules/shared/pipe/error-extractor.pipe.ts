import {Pipe, PipeTransform} from '@angular/core';
import {StringUtilService} from "../service/util/string-util.service";
import {FormValidationError} from "../model/form-validation-error.model";

@Pipe({
  name: 'extractErrors'
})
export class ErrorExtractorPipe implements PipeTransform {

  private static readonly errors = new Map<string, (arg0: any) => string>([
    ['required', () => 'Pole jest wymagane'],
    ['minlength', (params) => `Minimalna liczba znaków: ${params.requiredLength}`],
    ['maxlength', (params) => `Za duża liczba znaków. Maksymalna: ${params.requiredLength}`],
    ['max', (params) => `Zbyt duża liczba. Maksymalna: ${params.max}`],
    ['email', () => 'Niepoprawny format email (wymagany np. jkowalski@syp.com)'],
    ['customMessage', (params) => `${params.message}`],
  ]);

  public static getValidationErrorMsg(value: FormValidationError) {
    const fn = this.errors.get(value.key);

    if (fn) {
      return fn(value.params);
    } else if (value.params && value.params.message) {
      return value.params.message;
    } else {
      console.warn("Unhandled error", value);
    }
  }

  public static getValidationErrorFromAny(error: any): string {
    let errorMsg = '';

    Object.entries(error).forEach((keyError: [string, unknown]) => {
      const validationError = {
        key: keyError[0],
        params: keyError[1]
      };

      if (StringUtilService.getLength(errorMsg) > 0) {
        errorMsg = errorMsg + '\n';
      }

      errorMsg = errorMsg.concat(ErrorExtractorPipe.getValidationErrorMsg(validationError));
    });

    return errorMsg;
  }

  transform(value: any, ...args: unknown[]): string {
    if (value) {
      return ErrorExtractorPipe.getValidationErrorFromAny(value);
    }
    return '';
  }

}
