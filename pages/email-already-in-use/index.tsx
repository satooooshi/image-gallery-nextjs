import React, { useEffect } from 'react';
import loginLayoutStyles from '@/styles/layouts/Login.module.scss';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import textInputStyles from '@/styles/components/TextInput.module.scss';
import textLinkStyles from '@/styles/components/TextLink.module.scss';
import clsx from 'clsx';
import authFormStyles from '@/styles/components/AuthForm.module.scss';
import { useAuthenticate } from '../../contexts/useAuthenticate';
import { useRouter } from 'next/router';

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const { submitPasswordResetEmail, currentUserInfo } = useAuthenticate();

  useEffect(() => {
    // get email from local storage
  }, []);

  return (
    <div>
       <Head>
        <title>ボールド | パスワード再発行</title>
      </Head>
      <section class="bg-white dark:bg-slate-800 dark:text-white">
        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Success</span>
            </div>
            <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white"> {
                'このメールアドレスは既に使用されています。\n'
                // 'このメールアドレスは既に使用されています。\n認証用メールを再送信しますか？'
              }</p>
            <button data-modal-toggle="successModal" type="button" class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900">
                Continue
            </button>
            <p className={authFormStyles.form_margin}>
              <Link href="/login" legacyBehavior>
                <a className={textLinkStyles.link}>ログイン画面へ</a>
              </Link>
            </p>
            <p className={authFormStyles.form_margin}>
              アカウントが未登録ですか？
              <Link href="/register" passHref legacyBehavior>
                <a className={textLinkStyles.link}>サインアップ</a>
              </Link>
            </p>
        </div>
</section>
<div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>ボールド | パスワード再発行</title>
      </Head>
      {/* <div className={loginLayoutStyles.logo_image}>
        <Image src={boldLogo} alt="bold logo" />
      </div> */}
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          if (currentUserInfo?.email) {
            submitPasswordResetEmail(currentUserInfo?.email);
          }
        }}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <div className={authFormStyles.login_form}>
            <p className={clsx(authFormStyles.form_margin)}>
              {
                'このメールアドレスは既に使用されています。\n'
                // 'このメールアドレスは既に使用されています。\n認証用メールを再送信しますか？'
              }
            </p>
            {/* <p className={authFormStyles.validation_error_text}>
              {errors.email}
            </p>
            <button />
            <AuthButton
              name="認証用メールを再送信"
              isActive={true}
              onClick={() => handleSubmit()}
            /> */}
            <p className={authFormStyles.form_margin} />
            <p className={authFormStyles.form_margin}>
              <Link href="/login" legacyBehavior>
                <a className={textLinkStyles.link}>ログイン画面へ</a>
              </Link>
            </p>
            <p className={authFormStyles.form_margin}>
              アカウントが未登録ですか？
              <Link href="/register" passHref legacyBehavior>
                <a className={textLinkStyles.link}>サインアップ</a>
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default ForgotPassword;
