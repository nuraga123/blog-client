interface ILang {
  login: string;
  logout: string;
  logout_confirm: string;
  loading: string;
  register: string;
  register_title: string;
  email: string;
  email_required: string;
  email_invalid: string;
  password: string;
  password_required: string;
  password_min: string;
  login_failed: string;
  cancel: string;
  yes: string;
  register_btn: string;
  username: string;
  register_failed: string;
  login_success: string;
  invalid_password: string;
  forgot_password: string;
}

interface ITanslations {
  en: ILang;
  ru: ILang;
  az: ILang;
}

export const translations: ITanslations = {
  en: {
    // login
    login: 'Login',
    logout: 'Logout',
    logout_confirm: 'Do you really want to logout?',
    login_failed: 'Authentication failed !',
    login_success: 'login was successful',

    // register
    register: 'Create Account',
    register_title: 'Creating an account',
    register_btn: 'register',
    register_failed: 'Registration failed !',

    // form
    username: 'full name',
    email: 'E-Mail',
    email_required: 'Enter your email !',
    email_invalid: 'Invalid email format !',
    password: 'Password',
    invalid_password: 'invalid password',
    password_required: 'Enter your password !',
    password_min: 'Password must be at least 8 characters !',

    //
    cancel: 'cancel',
    yes: 'Yes',
    loading: 'loading',
    forgot_password: 'forgot password ?',
  },
  ru: {
    // login
    login: 'Войти',
    logout_confirm: 'Вы действительно хотите выйти ?',
    logout: 'Выйти',
    login_failed: 'Не удалось авторизоваться !',
    login_success: 'вход прошел успешно',

    // register
    register: 'Создать аккаунт',
    register_title: 'Создание аккаунта',
    register_btn: 'зарегистрироваться',
    register_failed: 'Регистрация не удалась!',

    // form
    username: 'Полное имя',
    email: 'E-Mail',
    email_required: 'Введите почту',
    email_invalid: 'Неверный формат почты',
    password: 'Пароль',
    invalid_password: 'Неверный пароль',
    password_required: 'Введите пароль',
    password_min: 'Пароль должен быть не менее 8 символов',

    //
    cancel: 'отмена',
    yes: 'Да',
    loading: 'загрузка',
    forgot_password: 'Забыли пароль ?',
  },
  az: {
    // login
    login: 'Daxil ol',
    logout: 'Çıxış et',
    logout_confirm: 'Çıxmaq istəyirsinizmi ?',
    login_failed: 'Daxil ola bilmədiniz !',
    login_success: 'giriş uğurlu oldu',

    // register
    register: 'Hesab yarat',
    register_title: 'qeydiyyat',
    register_btn: 'qeydiyyatdan keçin',
    register_failed: 'Qeydiyyat alınmadı !',

    // form
    username: 'soyadı və adınız',
    email: 'E-Mail',
    email_required: 'Email daxil edin',
    email_invalid: 'Yanlış email formatı',
    password: 'Şifrə',
    invalid_password: 'Yanlış Şifrə',
    password_required: 'Şifrəni daxil edin',
    password_min: 'Şifrə ən azı 8 simvoldan ibarət olmalıdır',
    
    //
    cancel: 'ləğv edin',
    yes: 'Bəli',
    loading: 'yüklənir',
    forgot_password: 'parolunuzu unutmusunuz ?',
  },
};
