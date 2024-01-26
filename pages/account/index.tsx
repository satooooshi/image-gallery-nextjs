import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import { Formik, useFormik } from 'formik'
import { Gender, User } from '../../utils/types'
import { registerSchema } from '../../utils/validation/schema'
import loginLayoutStyles from '@/styles/layouts/Login.module.scss'
import { useRouter } from 'next/router'
import authFormStyles from '@/styles/components/AuthForm.module.scss'
import clsx from 'clsx'
import { formikErrorMsgFactory } from '../../utils/formikErrorMsgFactory'
import Header from '@/components/Header'

const Login: React.FC = () => {
  const {
    currentUserInfo,
    getUserDetail,
    userDetail,
    signout,
    updateUserProfile,
  } = useAuthenticate()
  const router = useRouter()

  const [avatar, setAvatar] = useState<File | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // ;(async () => {
    //   await
    // })()
    getUserDetail()
  }, [currentUserInfo])

  const initialUserValues: Partial<User> = {
    email: currentUserInfo?.email || '',
    displayName: currentUserInfo?.displayName || '',
    photoURL: currentUserInfo?.photoURL || '',
    birthdate: userDetail?.birthdate,
    gender: userDetail?.gender,
    password: 'password',
  }

  const {
    handleSubmit,
    handleChange,
    validateForm,
    setValues,
    values,
    errors,
  } = useFormik({
    initialValues: initialUserValues,
    enableReinitialize: true,
    onSubmit: async (submitted) => {
      try {
        setLoading(true)
        await updateUserProfile({
          avatar: avatar ? avatar : '',
          displayName:
            initialUserValues?.displayName !== submitted?.displayName
              ? submitted?.displayName
              : '',
          birthdate:
            initialUserValues?.birthdate !== submitted?.birthdate
              ? submitted?.birthdate
              : '',
          gender:
            initialUserValues?.gender !== submitted?.gender
              ? submitted?.gender
              : '',
        })
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(
          '---- An error occurred while createUserWithEmailAndPassword',
        )
        // Handle error as needed
      }
      setLoading(false)
    },
    validationSchema: registerSchema,
  })

  const checkErrors = async () => {
    const errors = await validateForm()
    const messages = formikErrorMsgFactory(errors)
    if (messages) {
      console.log('account update error ', messages)
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (!currentUserInfo?.email) {
      router.push('/login')
    }
  }, [currentUserInfo?.email])

  if (!currentUserInfo?.email || !currentUserInfo?.emailVerified) {
    return <div />
  }

  return (
    <div>
      <Head>
        <title>アカウント編集</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Header />
        <section className="bg-white dark:bg-slate-800 dark:text-white">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              アカウント編集
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
                        : currentUserInfo?.photoURL
                          ? currentUserInfo?.photoURL
                          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                    style={{
                      borderRadius: '100%',
                      maxWidth: '270px',
                      maxHeight: '270px',
                      height: '50vw',
                      width: '50vw',
                      objectFit: 'cover',
                    }}
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
                        setAvatar(e.target.files[0])
                      }}
                    />
                    ファイルを選択
                  </label>
                  {!avatar && !currentUserInfo?.photoURL ? (
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
                    readonly
                    disabled
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="test@example.com"
                    required=""
                  />
                  {errors.email ? (
                    <div className={authFormStyles.validation_error_text}>
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <button
                  className="mt-6 w-3/5 h-12 bg-gray-500 text-white rounded-full dark:text-white"
                  type="button"
                  onClick={() => {
                    router.push('/update-email')
                  }}
                >
                  メールアドレスを更新
                </button>
                <div className="w-full">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    パスワード
                  </label>
                  <input
                    readonly
                    disabled
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="password"
                    required=""
                  />
                  {errors.password ? (
                    <div className={authFormStyles.validation_error_text}>
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  className="mt-6 w-3/5 h-12 bg-gray-500 text-white rounded-full dark:text-white"
                  type="button"
                  onClick={() => {
                    router.push('/update-password')
                  }}
                >
                  パスワードを更新
                </button>
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
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value={Gender.MALE}> 男性</option>
                    <option value={Gender.FEMALE}>女性</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <button
                  className="mt-6 w-2/5 h-12 bg-gray-500 text-white rounded-full dark:text-white disabled:opacity-25"
                  type="button"
                  disabled={!!Object.keys(errors).length || loading}
                  onClick={() => checkErrors()}
                >
                  {loading ? '更新中...' : '更新'}
                </button>
              </div>
              <div className="w-full">
                <button
                  className="mt-6 w-2/5 h-12 bg-gray-500 text-white rounded-full dark:text-white"
                  type="button"
                  onClick={() => {
                    router.push('/delete-account')
                  }}
                >
                  このアカウントを削除
                </button>
              </div>
              <div className="w-full">
                <button
                  className="mt-6 w-2/5 h-12 bg-gray-500 text-white rounded-full dark:text-white"
                  type="button"
                  onClick={() => signout()}
                >
                  ログアウト
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login
