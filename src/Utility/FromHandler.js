import { toast } from 'react-hot-toast';

const EmailRegx = /\S+@\S+\.\S+/;
const MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsMobile(value) {
    return MobileRegx.test(value);
  }

  IsEmail(value) {
    return !EmailRegx.test(value);
  }

  ErrorToast(msg) {
    if (typeof window !== 'undefined') {
      toast.error(msg);
    }
  }


  SuccessToast(msg) {
    toast.success(msg);
  }
}

const formHelper = new FormHelper();

export const { IsEmpty, IsMobile, IsEmail, ErrorToast, SuccessToast } = formHelper;
