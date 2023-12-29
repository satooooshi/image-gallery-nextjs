import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Bridge from '../components/Icons/Bridge'
import Modal from '../components/Modal'
import { useAuthenticate } from '../contexts/useAuthenticate'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import ImageUpload from './ImageUpload'

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const { currentUserInfo, signout } = useAuthenticate();


  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    console.log(images)
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  if (!currentUserInfo?.email) {
    return <div/>
  }

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}

  <section className="flex items-center">
  <div className="w-full max-w-screen-xl px-1 mx-auto">
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg bg-gray-50 dark:bg-gray-900">
      <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
      <div className="flex-row items-center justify-start p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
      <img  style={{
              borderRadius: '100%',
              maxWidth: '70px',
              maxHeight: '70px',
              height: '15vw',
            }} 
            src={currentUserInfo?.photoURL}
      />
        <div>
          <h5 className="mr-3 font-semibold dark:text-white">{currentUserInfo?.displayName}</h5>
          <p className="text-gray-500 dark:text-gray-400">{currentUserInfo?.email}</p>
        </div>
        </div>
        <div className="flex-row items-center justify-end p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <button onClick={()=>{router.push("/account")}}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
            <path
              d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
          アカウント編集
        </button>
        <button type="button"
        onClick={signout}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-1" viewBox="0 0 20 20" fill="currentColor"
               aria-hidden="true">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1L8 1V2L2 2L2 13H8V14H1L1 1ZM10.8536 4.14645L14.1932 7.48614L10.8674 11.0891L10.1326 10.4109L12.358 8L4 8V7L12.2929 7L10.1464 4.85355L10.8536 4.14645Z" fill="#FFFFFF"/>
          </svg>
          ログアウト
        </button>
        </div>
      </div>
    </div>
  </div>
</section>

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4 p-2">
          <div className="after:content relative mb-5 flex h-[400px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              Photo Library
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            画像共有サイト
            </p>
          </div>
          <ImageUpload/>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <>
            {/* <div className={"text-white"}>Uploaded By</div> */}
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
            </>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Powered by　
        <a
          href="https://github.com/satooooshi"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          github.com/satooooshi
        </a>
      </footer>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
