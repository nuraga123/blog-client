interface ILang {
  cancel: string;
  confirm_password: string;
  email: string;
  email_invalid: string;
  email_required: string;
  email_success: string;
  error_send: string;
  forgot_password: string;
  invalid_password: string;
  loading: string;
  login: string;
  login_failed: string;
  login_success: string;
  logout: string;
  logout_confirm: string;
  message: string;
  message_invalid: string;
  new_password: string;
  new_password_required: string;
  password: string;
  password_min: string;
  password_required: string;
  password_сonfirm: string;
  register: string;
  register_btn: string;
  register_failed: string;
  register_title: string;
  reset_password: string;
  reset_password_confirm: string;
  reset_password_failed: string;
  reset_password_success: string;
  reset_password_token: string;
  send: string;
  support_text: string;
  support_title: string;
  token_btn: string;
  token: string;
  update_password: string;
  username: string;
  username_invalid: string;
  yes: string;
  terms_and_conditions: string; // New addition
  privacy_policy: string; // New addition
  contact_us: string; // New addition
  loading_message: string; // New addition
  password_strength: string; // New addition
  forgot_password_info: string; // New addition
}

interface ITanslations {
  en: ILang;
  ru: ILang;
  az: ILang;
}

export const translations: ITanslations = {
  en: {
    cancel: 'cancel',
    confirm_password: 'Confirm Password',
    email: 'E-Mail',
    email_invalid: 'Invalid email format!',
    email_required: 'Enter your email!',
    email_success: 'Message sent! We will contact you shortly',
    error_send: 'Error sending message',
    forgot_password: 'Forgot password?',
    invalid_password: 'Invalid password',
    loading: 'Loading',
    login: 'Login',
    login_failed: 'Authentication failed!',
    login_success: 'Login was successful',
    logout: 'Logout',
    logout_confirm: 'Do you really want to logout?',
    message: 'Message',
    message_invalid: 'Write the problem in a message!',
    new_password: 'New Password',
    new_password_required: 'Enter a new password',
    password: 'Password',
    password_min: 'Password must be at least 8 characters!',
    password_required: 'Enter your password!',
    register: 'Create Account',
    register_btn: 'Register',
    register_failed: 'Registration failed!',
    register_title: 'Creating an account',
    reset_password: 'Reset Password',
    reset_password_confirm: 'Confirm new password',
    reset_password_failed: 'Failed to reset password',
    reset_password_success: 'Password reset successfully',
    reset_password_token: 'Enter reset token',
    send: 'Send',
    support_text:
      'If you forgot your password, click “Forgot Password”.\n\n If you have a token, click “I have a token”',
    support_title: 'Describe your issue and provide your name and email',
    token_btn: 'I have a token',
    token: 'Password reset token',
    update_password: 'Update Password',
    username: 'Full Name',
    username_invalid: 'Enter your name',
    yes: 'Yes',
    terms_and_conditions: 'Terms and Conditions', // New addition
    privacy_policy: 'Privacy Policy', // New addition
    contact_us: 'Contact Us', // New addition
    loading_message: 'Please wait, we are processing your request.', // New addition
    password_strength:
      'Your password must be at least 8 characters long, including letters and numbers.', // New addition
    forgot_password_info: 'Enter your email to receive a password reset link.',
    password_сonfirm: 'Write Repeat password',
  },
  ru: {
    cancel: 'Отмена',
    confirm_password: 'Подтвердите пароль',
    email: 'E-Mail',
    email_invalid: 'Неверный формат почты!',
    email_required: 'Введите почту!',
    email_success: 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время',
    error_send: 'Ошибка при отправке сообщения',
    forgot_password: 'Забыли пароль?',
    invalid_password: 'Неверный пароль',
    loading: 'Загрузка',
    login: 'Войти',
    login_failed: 'Не удалось авторизоваться!',
    login_success: 'Вход выполнен успешно',
    logout: 'Выйти',
    logout_confirm: 'Вы действительно хотите выйти?',
    message: 'Сообщение',
    message_invalid: 'Напишите проблему в сообщении!',
    new_password: 'Новый пароль',
    new_password_required: 'Введите новый пароль',
    password: 'Пароль',
    password_min: 'Пароль должен быть не менее 8 символов!',
    password_required: 'Введите пароль!',
    register: 'Создать аккаунт',
    register_btn: 'Зарегистрироваться',
    register_failed: 'Регистрация не удалась!',
    register_title: 'Создание аккаунта',
    reset_password: 'Сброс пароля',
    reset_password_confirm: 'Подтвердите новый пароль',
    reset_password_failed: 'Не удалось сбросить пароль',
    reset_password_success: 'Пароль успешно сброшен',
    reset_password_token: 'Введите токен для сброса',
    send: 'Отправить',
    support_text:
      'Если вы забыли пароль, нажмите “Забыли пароль?”.\n\n Если у вас есть токен, нажмите “У меня есть токен”',
    support_title: 'Опишите проблему и укажите ваше имя и email',
    token_btn: 'У меня есть токен',
    token: 'Токен сброса пароля',
    update_password: 'Обновить пароль',
    username: 'Полное имя',
    username_invalid: 'Введите имя',
    yes: 'Да',
    terms_and_conditions: 'Условия и положения', // New addition
    privacy_policy: 'Политика конфиденциальности', // New addition
    contact_us: 'Свяжитесь с нами', // New addition
    loading_message: 'Пожалуйста, подождите, мы обрабатываем ваш запрос.', // New addition
    password_strength:
      'Ваш пароль должен содержать не менее 8 символов, включая буквы и цифры.', // New addition
    forgot_password_info:
      'Введите вашу почту, чтобы получить ссылку для сброса пароля.',
    password_сonfirm: 'напишите повторно пароль',
  },
  az: {
    cancel: 'Ləğv edin',
    confirm_password: 'Şifrəni təsdiq edin',
    email: 'E-Mail',
    email_invalid: 'Yanlış email formatı!',
    email_required: 'Email daxil edin!',
    email_success: 'Mesaj göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq',
    error_send: 'Mesaj göndərilərkən xəta baş verdi',
    forgot_password: 'Parolunuzu unutmusunuz?',
    invalid_password: 'Yanlış Şifrə',
    loading: 'Yüklənir',
    login: 'Daxil ol',
    login_failed: 'Daxil ola bilmədiniz!',
    login_success: 'Giriş uğurla tamamlandı',
    logout: 'Çıxış et',
    logout_confirm: 'Çıxmaq istəyirsinizmi?',
    message: 'Mesaj',
    message_invalid: 'Problemi mesajda qeyd edin!',
    new_password: 'Yeni şifrə',
    new_password_required: 'Yeni şifrəni daxil edin',
    password: 'Şifrə',
    password_min: 'Şifrə ən azı 8 simvoldan ibarət olmalıdır!',
    password_required: 'Şifrəni daxil edin!',
    register: 'Hesab yarat',
    register_btn: 'Qeydiyyatdan keç',
    register_failed: 'Qeydiyyat alınmadı!',
    register_title: 'Hesab yaradılması',
    reset_password: 'Şifrəni sıfırla',
    reset_password_confirm: 'Yeni şifrəni təsdiqləyin',
    reset_password_failed: 'Şifrəni sıfırlamaq alınmadı',
    reset_password_success: 'Şifrə uğurla sıfırlandı',
    reset_password_token: 'Sıfırlama kodunu daxil edin',
    send: 'Göndər',
    support_text:
      'Parolunuzu unutmusunuzsa, "Parolu unutdum" düyməsini klikləyin.\n\n Tokeniniz varsa, "Məndə token var" düyməsini basın',
    support_title: 'Probleminizi, ad və soyad və e-poçt qeyd edin',
    token_btn: 'Məndə token var',
    token: 'Parol sıfırlama token',
    update_password: 'Şifrəni yenilə',
    username: 'Ad və soyad',
    username_invalid: 'Adınızı daxil edin',
    yes: 'Bəli',
    terms_and_conditions: 'Şərtlər və şərtlər', // New addition
    privacy_policy: 'Məxfilik siyasəti', // New addition
    contact_us: 'Bizimlə əlaqə', // New addition
    loading_message: 'Zəhmət olmasa gözləyin, biz sizin sorğunuza baxırıq.', // New addition
    password_strength:
      'Şifrəniz ən azı 8 simvol uzunluğunda olmalı, hərflər və rəqəmlər daxil etməlidir.', // New addition
    forgot_password_info: 'Şifrəni sıfırlamaq üçün e-poçtunuzu daxil edin.',
    password_сonfirm: 'Təkrar parol yazın',
  },
};
