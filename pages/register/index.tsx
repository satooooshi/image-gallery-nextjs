import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import { Formik, useFormik } from 'formik'
import { Gender, User } from '../../utils/types'
import { registerSchema } from '../../utils/validation/schema'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import textLinkStyles from '@/styles/components/TextLink.module.scss'
import { dateTimeFormatterFromJSDDate } from '../../utils/dateTimeFormatter'
import clsx from 'clsx'
import { formikErrorMsgFactory } from '../../utils/formikErrorMsgFactory'

const Login: React.FC = () => {
  const { signup } = useAuthenticate()

  const [agreed, setAgreed] = useState(false)
  const [avatar, setAvatar] = useState<File | null>()

  const initialUserValues: Partial<User> = {
    email: '',
    displayName: '',
    photoURL: '',
    birthdate: dateTimeFormatterFromJSDDate({
      dateTime: new Date(),
      format: 'yyyy-LL-dd',
    }),
    gender: Gender.MALE,
    password: '',
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialUserValues,
    onSubmit: async (submitted) => {
      try {
        signup({
          email: submitted.email || '',
          password: submitted.password || '',
          displayName: submitted.displayName || '',
          birthdate: submitted.birthdate,
          gender: submitted.gender || '',
          avatar,
        })
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(
          '---- An error occurred while createUserWithEmailAndPassword',
        )
        // Handle error as needed
      }
    },
    validationSchema: registerSchema,
  })

  const checkErrors = async () => {
    const errors = await validateForm()
    console.log(errors)
    const messages = formikErrorMsgFactory(errors)
    if (messages) {
      console.log('register error ', messages)
    } else {
      handleSubmit()
    }
  }
  return (
    <div>
      <Head>
        <title>新規登録</title>
      </Head>
      <section className="bg-white dark:bg-slate-800 dark:text-white">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            新規登録
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  for="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  プロフィールアイコン
                </label>

                <img
                  className={loginLayoutStyles.avatar}
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  }
                  alt=""
                />
                <label className={loginLayoutStyles.avatar_input_label}>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => {
                      // console.log(e.target.files?.[0]);
                      setAvatar(e.target.files[0])
                    }}
                  />
                  ファイルを選択
                </label>
                {!avatar ? (
                  <div
                    className={clsx(
                      'mt-4',
                      authFormStyles.validation_error_text,
                    )}
                  >
                    {'プロフィールアイコンは必須です。'}
                  </div>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <label
                  for="displayName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ユーザー名
                </label>
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  value={values.displayName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="username"
                  required=""
                />
                {errors.displayName ? (
                  <div className={authFormStyles.validation_error_text}>
                    {errors.displayName}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  メールアドレス
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="test@example.com"
                  required=""
                />
                {errors.email ? (
                  <div className={authFormStyles.validation_error_text}>
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  パスワード
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="password"
                  required=""
                />
                {errors.password ? (
                  <div className={authFormStyles.validation_error_text}>
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  for="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  生年月日
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  value={values.birthdate}
                  background="white"
                  onChange={(e) => {
                    setValues((i) => ({ ...i, birthdate: e.target.value }))
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=""
                  required=""
                />
                {errors.birthdate ? (
                  <div className={authFormStyles.validation_error_text}>
                    {errors.birthdate}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  性別
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value={Gender.MALE}> 男性</option>
                  <option value={Gender.FEMALE}>女性</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                style={{
                  width: '20px',
                  height: '20px',
                }}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <Link
                className={textLinkStyles.link}
                textDecoration={'underline'}
                href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451"
                isExternal
              >
                利用規約
              </Link>
              の内容を確認した上で新規登録をします。
            </div>
            <button
              className="mt-6 w-40 h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25" //className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              type="button"
              disabled={!agreed || !avatar || !!Object.keys(errors).length}
              onClick={() => checkErrors()}
            >
              新規登録
            </button>
            <p className="mt-6 ml-4 dark:text-white">
              <Link legacyBehavior href="/login" passHref>
                <a className={textLinkStyles.link}>ログインはこちら</a>
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
