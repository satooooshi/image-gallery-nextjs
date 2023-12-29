// import Error from 'next/error'

// export default function Page({statusCode}) {
//   return <Error statusCode={400} title={'リクエストが集中しています。しばらく待ってから再度操作してください。'} />;
 
//   return 
//   <p>
//   {statusCode
//     ? `An error ${statusCode} occurred on serveraa`
//     : 'An error occurred on client'}
//   </p>
// }
'use client' 

function Error({ statusCode }) {
  console.log('---statuscode:', statusCode)
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}
 
// console log is output in terminal
Error.getInitialProps = ({ res, err }) => {
  console.log('--- getinitialprops:',{ res, err })
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
 
export default Error