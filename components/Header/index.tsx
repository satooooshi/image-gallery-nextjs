import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuthenticate } from '../../contexts/useAuthenticate'
import Link from 'next/link'

const Header: NextPage = () => {
  const router = useRouter()
  const { currentUserInfo, signout } = useAuthenticate()

  if (!currentUserInfo?.email) {
    return <div />
  }

  return (
    <section className="flex items-center">
      <div className="w-full max-w-screen-xl px-1 mx-auto">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div className="flex-row items-center justify-start p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div>
                {/* <div
                  onClick={() => {
                    router.push('/')
                  }}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                > */}
                <Link
                  href={`/`}
                  shallow
                  className="block w-full cursor-pointer"
                >
                  <h1 className="mr-3 font-semibold dark:text-white">
                    PHOTO LIBRARY
                  </h1>
                  {/* </div> */}
                </Link>
              </div>
            </div>
            <div className="flex-row items-center justify-end space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
              <div className="flex-row items-center justify-start px-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
                <img
                  style={{
                    borderRadius: '100%',
                    maxWidth: '70px',
                    maxHeight: '70px',
                    height: '15vw',
                    width: '15vw',
                    objectFit: 'cover',
                  }}
                  src={currentUserInfo?.photoURL}
                />
                <div>
                  <h5 className="mr-3 font-semibold dark:text-white">
                    {currentUserInfo?.displayName}
                  </h5>
                  <p className="text-gray-500 dark:text-gray-400">
                    {currentUserInfo?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  router.push('/account')
                }}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                アカウント編集
              </button>
              <button
                type="button"
                onClick={signout}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 1L8 1V2L2 2L2 13H8V14H1L1 1ZM10.8536 4.14645L14.1932 7.48614L10.8674 11.0891L10.1326 10.4109L12.358 8L4 8V7L12.2929 7L10.1464 4.85355L10.8536 4.14645Z"
                    fill="#FFFFFF"
                  />
                </svg>
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
