import React, { useState } from 'react'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import { Formik } from 'formik'
import Head from 'next/head'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import Link from 'next/link'

const ForgotPassword: React.FC = () => {
  const { deleteAccount } = useAuthenticate()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  return (
    <div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>ボールド | パスワード再発行</title>
      </Head>
      <Formik
        initialValues={{ password: '' }}
        onSubmit={async (values) => {
          if (values?.password) {
            try {
              console.log('values?.pass', values?.password)
              await deleteAccount(values?.password)
              setSent(true)
            } catch (error: any) {
              const errorCode = error.code
              const errorMessage = error.message
              // Handle error as needed
              console.log('---- An error occurred while deleteAccount')
              console.log(error)
              switch (error.code) {
                case 'auth/invalid-credential':
                  setError('パスワードが違います。')
                  return
                case 'auth/user-mismatch':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/too-many-requests':
                default:
                  setError(
                    'リクエストが集中しています。しばらく待ってから再度操作してください。',
                  )
                  return
              }
            }
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
                  ? 'パスワードを入力してアカウントを削除を押してください。'
                  : 'アカウントを削除しました。'}
              </p>
              {!sent && (
                <div className="w-full">
                  <p className={authFormStyles.validation_error_text}>
                    {error}
                  </p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="パスワードを入力してください"
                    required=""
                  />
                  {errors.password ? (
                    <div className={authFormStyles.validation_error_text}>
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              )}
              <button
                className="mt-6 mb-6  px-5 w-auto h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25"
                type="button"
                disabled={sent || !values?.password}
                onClick={() => handleSubmit()}
              >
                アカウントを削除
              </button>
              <p className={authFormStyles.form_margin}>
                <Link href="/account" legacyBehavior>
                  <a className={textLinkStyles.link}>戻る</a>
                </Link>
              </p>
              <p className={authFormStyles.form_margin}>
                <Link href="/login" legacyBehavior>
                  <a className={textLinkStyles.link}>ログイン画面へ</a>
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
