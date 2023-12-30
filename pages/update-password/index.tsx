import React, { useState } from 'react'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import { Formik } from 'formik'
import Head from 'next/head'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import Link from 'next/link'

const ForgotPassword: React.FC = () => {
  const { submitPasswordResetEmail, currentUserInfo } = useAuthenticate()
  const [sent, setSent] = useState(false)
  return (
    <div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>ボールド | パスワード再発行</title>
      </Head>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => {
          if (currentUserInfo?.email) {
            submitPasswordResetEmail(currentUserInfo?.email)
            setSent(true)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <section className="bg-white dark:bg-slate-800 dark:text-white">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {sent && (
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Success</span>
                </div>
              )}
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white  whitespace-pre-wrap">
                {!sent
                  ? 'ご登録されているメールアドレス宛に\nパスワード再発行メールを送信します。'
                  : 'ご登録されているメールアドレス宛に\nパスワード再発行メールを送信しました。'}
              </p>
              <button
                className="mt-6 mb-6  px-5 w-auto h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25"
                type="button"
                disabled={sent}
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
  )
}

export default ForgotPassword
