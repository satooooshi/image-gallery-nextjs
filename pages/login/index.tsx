import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import Head from 'next/head'
import Link from 'next/link'
import textInputStyles from '@/styles/components/TextInput.module.scss'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import clsx from 'clsx'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import { loginSchema } from '../../utils/validation/schema'

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuthenticate()

  const [error, setError] = useState('')

  const _login = async (email: string, password: string) => {
    try {
      await login(email, password)
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      // Handle error as needed
      console.log('---- An error occurred while _login')
      console.log(error)
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('メールアドレスまたはパスワードが違います。')
          break
        case 'auth/user-mismatch':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/too-many-requests':
        default:
          setError(
            'リクエストが集中しています。しばらく待ってから再度操作してください。',
          )
          break
      }
      setIsLoading(false)
    }
  }

  const { values, handleChange, handleSubmit, validateForm } = useFormik({
    enableReinitialize: true,
    initialValues: { email: '', password: '' },
    // validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError('')
      setIsLoading(true)
      await _login(values.email, values.password)
    },
  })

  const checkErrors = async (e: React.FormEvent<Element>) => {
    e.preventDefault()
    const errors = await validateForm()
    const messages = '' // formikErrorMsgFactory(errors);
    if (messages) {
    } else {
      handleSubmit()
    }
  }

  return (
    <div>
      <Head>
        <title>ログイン</title>
      </Head>
      {/* <div >
        <Image src={boldLogo} alt="logo" style={{width:'100%', height:'auto'}}/>
      </div> */}
      <section className="bg-white dark:bg-slate-800 dark:text-white">
        <form
          className={authFormStyles.login_form}
          onSubmit={checkErrors}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              checkErrors(e)
            }
          }}
        >
          <h1
            className={clsx(
              authFormStyles.auth_title,
              authFormStyles.form_margin,
            )}
          >
            Login
          </h1>
          <p className={authFormStyles.validation_error_text}>{error}</p>
          <input
            type="email"
            name="email"
            placeholder="test@example.com"
            value={values.email}
            onChange={handleChange}
            background="white"
            className={clsx(
              'text-black',
              textInputStyles.input,
              authFormStyles.form_margin,
            )}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            background="white"
            className={clsx(
              'text-black',
              textInputStyles.input,
              authFormStyles.form_margin,
            )}
          />
          <button
            disabled={isLoading}
            className="w-40 h-12 bg-gray-500 text-white rounded-full  disabled:opacity-25"
          >
            ログイン
          </button>
          {/* <p className={authFormStyles.form_margin} />
        <label>
          <input
            type="checkbox"
            onClick={(e) => {
              //setAuthPersistence(!authPersistence)
            }}
          />
          &nbsp; Remember me
        </label> */}
          <p className={authFormStyles.form_margin} />
          <p className={authFormStyles.form_margin}>
            アカウントが未登録ですか？
            <Link legacyBehavior href="/register" passHref>
              <a className={textLinkStyles.link}>サインアップ</a>
            </Link>
          </p>
          <p className={authFormStyles.form_margin}>
            <Link legacyBehavior href="/forgot-password" passHref>
              <a className={textLinkStyles.link}>
                パスワードをお忘れの方はこちら
              </a>
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login
