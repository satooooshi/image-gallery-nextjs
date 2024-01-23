import React, { useEffect, useState } from 'react'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import { useFormik } from 'formik'
import { resetPasswordSchema } from '../../utils/validation/schema'
import { formikErrorMsgFactory } from '../../utils/formikErrorMsgFactory'

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [oobCode, setOobCode] = useState('')
  const [mode, setMode] = useState('')
  const { verifyEmail, resetPassword } = useAuthenticate()

  const initialUserValues = {
    password: '',
    password2: '',
  }
  const {
    handleSubmit: onFinish,
    handleChange,
    validateForm,
    values,
    errors,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialUserValues,
    onSubmit: async (submitted) => {
      try {
        console.log('submitted:' + oobCode + ', ' + values.password)
        console.log(submitted)
        resetPassword(oobCode, values.password)
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(
          '---- An error occurred while createUserWithEmailAndPassword',
        )
        // Handle error as needed
      }
    },
    validationSchema: resetPasswordSchema,
  })

  const checkErrors = async () => {
    const errors = await validateForm()
    const messages = formikErrorMsgFactory(errors)
    if (messages) {
      console.log(messages)
    } else {
      onFinish()
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const oc = queryParams.get('oobCode') || ''
    // if (!oc) {
    //   router.push('/error');
    // }
    setOobCode(oc)
    const md = queryParams.get('mode') || ''
    console.log('------- oobcode, mode', oc, mode)
    if (md === 'resetPassword') {
      setMode('resetPassword')
    } else {
      setMode('verifyEmail')
      verifyEmail(oc)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    // return <Spinner size="lg" />;
  }

  return (
    <div className={loginLayoutStyles.screen_wrapper}>
      <Head>
        <title>パスワード再発行</title>
      </Head>
      {mode === 'verifyEmail' ? (
        <section className="bg-white dark:bg-slate-800 dark:text-white">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
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
            <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white  whitespace-pre-wrap">
              {
                'メールアドレスが認証されました。\nログイン画面からログインし直してください。'
              }
            </p>
            <p className={authFormStyles.form_margin}>
              <Link href="/login" legacyBehavior>
                <a className={textLinkStyles.link}>ログイン画面へ</a>
              </Link>
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-white dark:bg-slate-800 dark:text-white">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              パスワードを再設定
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-1 sm:gap-6">
                <div className="w-full">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    新しいパスワード
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="password"
                    required=""
                  />
                  {errors.password ? <div>{errors.password}</div> : null}
                </div>
                <div className="w-full">
                  <label
                    for="password2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    新しいパスワード（確認）
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    value={values.password2}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-3/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="password"
                    required=""
                  />
                  {errors.password2 ? <div>{errors.password2}</div> : null}
                </div>
              </div>
              <div className="w-full">
                <button
                  className="mt-6 px-5 w-auto h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25"
                  type="button"
                  disabled={
                    !values.password ||
                    !values.password2 ||
                    values.password !== values.password2
                  }
                  onClick={() => checkErrors()}
                >
                  パスワードを再設定する
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

export default ForgotPassword
