import React from 'react';
import Image from 'next/image';
import loginLayoutStyles from '@/styles/layouts/Login.module.scss';
import { Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import textInputStyles from '@/styles/components/TextInput.module.scss';
import textLinkStyles from '@/styles/components/TextLink.module.scss';
import authFormStyles from '@/styles/components/AuthForm.module.scss';
import { useAuthenticate } from '../../contexts/useAuthenticate';

const ForgotPassword: React.FC = () => {
  const { _sendEmailVerification } =
    useAuthenticate();

  return (
    <div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>認証用メール再送信</title>
      </Head>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          _sendEmailVerification();
        }}>
        {({ values, handleChange, handleSubmit, errors }) => (
           <section class="bg-white dark:bg-slate-800 dark:text-white">
           <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
               <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                   <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                   <span class="sr-only">Success</span>
               </div>
                <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white"> 
                {
                   'このメールアドレスはまだ認証されていません。\n認証用メールを再送信しますか？'
                 }
                </p>
                <button 
                  className="mt-6 px-5 w-auto h-12 bg-gray-500 text-white rounded-full dark:text-white" 
                  type="button" 
                  disabled={
                    !values.password || !values.password2
                    // || values.password !== values.password2
                  }
                  onClick={() => handleSubmit()}
                  >
                  認証用メールを再送信
                </button>
                <p className={authFormStyles.form_margin}/>
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
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
