/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore'
import firebaseApp from '../base'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserInfo,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  applyActionCode,
  sendEmailVerification,
  verifyPasswordResetCode,
  confirmPasswordReset,
  updatePassword,
  setPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
  User,
  verifyBeforeUpdateEmail,
} from 'firebase/auth'
const firestorage = getStorage(firebaseApp)
const firestore = getFirestore(firebaseApp)

const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_VERCEL_DOMAIN,
  handleCodeInApp: false,
}

const AuthenticateContext = createContext({
  signup: (() => {}) as (submitted: any) => void,
  updateUserProfile: (() => {}) as (submitted: any) => void,
  login: (() => {}) as (email: string, password: string) => void,
  signout: (() => {}) as () => void,
  deleteAccount: (() => {}) as (password: string) => void,
  submitPasswordResetEmail: (() => {}) as (email: string) => void,
  verifyEmail: (() => {}) as (email: string) => void,
  updateEmail: (() => {}) as (email: string) => void,
  resetPassword: (() => {}) as (oobCode: string, password: string) => void,
  _updatePassword: (() => {}) as (oobCode: string, password: string) => void,
  _sendEmailVerification: (() => {}) as () => void,
  getCurrentUserInfo: (() => {}) as () => void,
  currentUserInfo: {} as any,
  getUserDetail: (() => {}) as () => void,
  userDetail: {} as any,
})

export const AuthenticateProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<User | null>()
  const [userDetail, setUserDetail] = useState<any>()

  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log('------ onAuthStateChanged')
      console.log(user)
      setUserInfo(user)
      console.log('--- path')
      console.log(window.location.pathname)
      if (
        (window.location.pathname === '/' ||
          window.location.pathname === '/account') &&
        !user?.email &&
        !user?.emailVerified
      ) {
        router.push('/login')
      } else if (!user?.email) {
        // when registering...
        // router.push('/login')
      } else {
      }
    })
    return () => {
      unsubscribed()
    }
  }, [])

  const getCurrentUserInfo = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
      console.log('------- User is signed in')
      console.log(user)
      setUserInfo(user)
    } else {
      // No user is signed in.
      console.log('------- User is signed out')
      // router.push('/login');
      // return;
    }
  }

  const getUserDetail = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
      console.log('------- getUserDetail, uid:' + user?.uid)
      const { uid } = user
      // Create a query against the collection.
      const docRef = collection(firestore, 'users')
      const q = query(docRef, where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        setUserDetail(doc.data())
      })
    } else {
      // No user is signed in.
      console.log('------- getUserDetail. User is signed out')
    }
  }

  const handleUploadAvatar = async (
    avatar: File,
    username: string,
    birthdate: Date,
    gender: string,
  ) => {
    try {
      if (avatar) {
        console.log(
          '--- uploading... ',
          avatar?.name || new Date().getTime().toString(),
        )
        console.log(avatar)

        const imageRef = ref(
          firestorage,
          avatar?.name || new Date().getTime().toString(),
        )
        const snapshot = await uploadBytes(imageRef, avatar)
        console.log('Uploaded a file!', snapshot)

        const url = await getDownloadURL(imageRef)
        console.log('---  getDownloadURL', url)

        const auth = getAuth()
        const user = auth.currentUser
        if (user !== null) {
          console.log('----------------updateUserProfile', user)

          try {
            await updateProfile(user, {
              displayName: username,
              photoURL: url,
            })

            console.log('---- Profile updated! ')

            const docRef = collection(firestore, 'users')
            await addDoc(docRef, {
              uid: user.uid,
              birthdate,
              gender,
            })

            console.log('---  addDoced')
            router.push('/')
          } catch (error) {
            console.log('---- An error occurred while updateProfile')
            console.log(error)
          }
        }
      } else {
        console.log('--- no avatar selected ')
      }
    } catch (error: any) {
      console.log('---- An error occurred while handleUploadAvatar ')
      console.log(error)
      // setError(true);
      // {
      //   error && <Alert severity="error">送信できませんでした</Alert>;
      // }
    }
  }

  const signup = async (submitted: any) => {
    try {
      console.log('--- signup submitted')
      console.log(submitted)

      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        submitted.email || '',
        submitted.password || '',
      )

      const user = userCredential.user
      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log('Sign-in provider: ' + profile.providerId)
          console.log('  Provider-specific UID: ' + profile.uid)
          console.log('  Name: ' + profile.displayName)
          console.log('  Email: ' + profile.email)
          console.log('  Photo URL: ' + profile.photoURL)
        })
        console.log('----------------im new userrrrrr', user)
      }
      await handleUploadAvatar(
        submitted.avatar,
        submitted.displayName || '',
        submitted.birthdate || new Date(),
        submitted.gender || '',
      )
    } catch (error: any) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      switch (error.code) {
        case 'auth/email-already-in-use':
          // すでにユーザが利用済みである際の処理
          // todo: put in local storage
          console.log(
            '--- auth/email-already-in-use (resend verif email when signup 認証用メール から登録を完了してください, 認証用メール再送するボタン)',
          )
          // await _sendEmailVerification();
          router.push('/email-already-in-use')
          return
        case 'auth/too-many-requests':
          console.log('--- auth/too-many-requests ')
          return
        default:
          // その他のエラー処理
          break
      }
    }
    await _sendEmailVerification()
    router.push('/verification-email-sent')
  }

  const updateUserProfile = async (submitted: any) => {
    console.log('--- updateUserProfile submitted')
    console.log(submitted)

    const auth = getAuth()
    const user = auth.currentUser
    if (!user?.uid) {
      console.log('cannot get uid')
      return
    }
    const { uid } = user
    let url = ''
    if (submitted?.avatar) {
      const imageRef = ref(
        firestorage,
        submitted?.avatar?.name || new Date().getTime().toString(),
      )
      const snapshot = await uploadBytes(imageRef, submitted?.avatar)
      url = await getDownloadURL(imageRef)
    }

    if (url || submitted?.displayName) {
      await updateProfile(user, {
        displayName: submitted?.displayName || undefined,
        photoURL: url || undefined,
      })
    }

    if (submitted?.birthdate || submitted?.gender) {
      let req = {}
      Object.keys(submitted).forEach(function (key) {
        // console.log("--- key:" + key +", value:"+ submitted[key]);
        if (submitted[key] && (key === 'birthdate' || key === 'gender')) {
          req[key] = submitted[key]
        }
      })
      const docRef = collection(firestore, 'users')
      const q = query(docRef, where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (docu) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docu.id, ' => ', docu.data())
        const userRef = doc(firestore, 'users', docu.id)
        await updateDoc(userRef, {
          uid,
          ...req,
        })
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const auth = getAuth()
      await setPersistence(auth, browserLocalPersistence)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      console.log(
        '---------------- login signInWithEmailAndPassword success',
        user,
      )

      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log('Sign-in provider: ' + profile.providerId)
          console.log('  Provider-specific UID: ' + profile.uid)
          console.log('  Name: ' + profile.displayName)
          console.log('  Email: ' + profile.email)
          console.log('  Photo URL: ' + profile.photoURL)
        })
        console.log('  user?.emailVerified: ' + user?.emailVerified)
        if (!user?.emailVerified) {
          router.push('/email-verification-required')
          return
        }
        setUserInfo(user)
        router.push('/')
      }
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      // Handle error as needed
      console.log(
        '---- An error occurred while login signInWithEmailAndPassword',
      )
      console.log(error)
      throw error
    }
  }

  const signout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('--------------- Sign-out successful.')
        router.push('/login')
      })
      .catch((error) => {
        // An error happened.
        console.log(
          '--------------- Sign-out successful.An error happened while signOut.',
        )
      })
  }

  const submitPasswordResetEmail = async (email: string) => {
    console.log('submit email:' + email)
    const auth = getAuth()
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings)
      console.log('メール送信成功')
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-mismatch':
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/too-many-requests':
          console.log('--- auth/too-many-requests ')
          router.push('/too-many-requests')
          // 再認証失敗時の処理
          return
        default:
        // その他の例外時の処理
      }
      // return;
      console.log('メール送信失敗')
      console.log(error)
      // throw error;
      throw new Error('エラーが発生しました。')
    }
  }

  const deleteAccount = async (password: string) => {
    try {
      const user = getAuth().currentUser
      if (!user?.uid) {
        console.log(' deleteAccount cannot get uid')
        return
      }
      const userCredential = await EmailAuthProvider.credential(
        user?.email,
        password,
      )
      const reAuthCredencial = await reauthenticateWithCredential(
        user,
        userCredential,
      )
      await reAuthCredencial.user.delete()
    } catch (error: any) {
      throw error
      switch (error.code) {
        case 'auth/user-mismatch':
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          // 再認証失敗時の処理
          break
        default:
        // その他の例外時の処理
      }
    }
  }

  const _sendEmailVerification = async () => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user?.uid) {
        console.log('---- Error: _sendEmailVerification user is null.')
        console.log(user)
        return
      }
      console.log('---- sending EmailVerification...')
      await sendEmailVerification(user, actionCodeSettings)
        .then(() => {
          // Email verification sent!
          // ...
          console.log('---- sendEmailVerification Email verification sent!...')
        })
        .catch((error) => {
          console.log('---- sendEmailVerification An error ocurred')
          // An error ocurred
          // ...
        })
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          // すでにユーザが利用済みである際の処理
          console.log('--- auth/email-already-in-use')
          router.push('/email-already-in-use')
          return
        case 'auth/too-many-requests':
          console.log('--- auth/too-many-requests')
          router.push('/too-many-requests')
          return
        default:
          break
      }
    }
  }

  const verifyEmail = async (oobCode: string) => {
    try {
      const auth = getAuth()
      await applyActionCode(auth, oobCode)
      return
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-action-code':
          console.log('--- auth/invalid-action-code')
          return
        default:
          break
      }
    }
  }

  const resetPassword = async (oobCode: string, password: string) => {
    try {
      const auth = getAuth()
      await verifyPasswordResetCode(auth, oobCode)
      await confirmPasswordReset(auth, oobCode, password)
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-action-code':
          console.log('--- auth/invalid-action-code')
          router.push('/invalid-action-code')
          return
        default:
          break
      }
    }
    router.push('/password-updated')
  }

  const updateEmail = async (email: string) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user?.uid) {
        console.log('---- _updateEmail user')
        console.log(user)
        return
      }
      await verifyBeforeUpdateEmail(user, email, actionCodeSettings)
    } catch (error: any) {
      console.log(error)
      switch (error.code) {
        case 'auth/requires-recent-login':
          router.push('/login')
          return
        case 'auth/too-many-requests':
          console.log('--- auth/too-many-requests')
          router.push('/too-many-requests')
          return
        case 'auth/invalid-action-code':
          console.log('--- auth/invalid-action-code')
          return
        default:
          break
      }
    }
    // router.push('/password-updated');
  }

  const _updatePassword = async (password: string) => {
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user?.uid) {
        console.log('---- _updatePassword user')
        console.log(user)
        return
      }
      updatePassword(user, password)
        .then(() => {
          // Update successful.
          router.push('/password-updated')
        })
        .catch((error) => {
          // An error ocurred
          // ...
        })
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-action-code':
          console.log('--- auth/invalid-action-code')
          return
        default:
          break
      }
    }
  }

  return (
    <AuthenticateContext.Provider
      value={{
        signup,
        updateUserProfile,
        login,
        signout,
        deleteAccount,
        submitPasswordResetEmail,
        resetPassword,
        _updatePassword,
        _sendEmailVerification,
        verifyEmail,
        updateEmail,
        getCurrentUserInfo,
        currentUserInfo: userInfo,
        getUserDetail,
        userDetail,
      }}
    >
      {children}
    </AuthenticateContext.Provider>
  )
}

export const useAuthenticate = () => useContext(AuthenticateContext)
