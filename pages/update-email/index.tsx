import React, { useState } from 'react';
import loginLayoutStyles from '@/styles/layouts/Login.module.scss';
import { Formik } from 'formik';
import Head from 'next/head';
import { useAuthenticate } from '../../contexts/useAuthenticate';
import Link from 'next/link';
import textLinkStyles from '@/styles/components/TextLink.module.scss';
import authFormStyles from '@/styles/components/AuthForm.module.scss';
import { emailSchema } from '../../utils/validation/schema';

const ForgotPassword: React.FC = () => {
  const { updateEmail } = useAuthenticate();
  const [sent, setSent] = useState(false);
  return (
    <div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>ボールド | パスワード再発行</title>
      </Head>
      <Formik
        validationSchema={emailSchema}
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await updateEmail(values?.email);
          setSent(true);
        }}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <section class="bg-white dark:bg-slate-800 dark:text-white">
          <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Success</span>
              </div>
              <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white"> 
              {!sent
                ? ' 新規メールアドレスを入力してください。\n再発行メールを送信します。'
                : '再発行メールを送信しました。\nメールに記載されているリンクから設定を完了してください。'}
                </p>
                {!sent&&<div class="w-full">
                  <input type="email" name="email" id="email" 
                   value={values.email}
                   onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="メールアドレスを入力してください" required=""/>
              {errors.email ? <div className={authFormStyles.validation_error_text}>{errors.email}</div> : null}
              </div>}
                <button 
                  className="mt-6 mb-6 px-5 w-auto h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25" 
                  type="button" 
                  disabled={sent||!values?.email}
                  onClick={() => handleSubmit()}
                  >
                  再発行メールを送信
                </button>
                <p className={authFormStyles.form_margin}>
                 <Link href="/account" legacyBehavior>
                   <a className={textLinkStyles.link}>戻る</a>
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
