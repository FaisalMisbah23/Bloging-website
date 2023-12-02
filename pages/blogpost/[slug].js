import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/BlogPost.module.css'

const slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
}

  const [blog, setBlog] = useState(props.allBlog);
  

// use in the case of not using server side reandering.

  // const router = useRouter();
  // useEffect(() => {
  //     if (!router.isReady) return;
  //     const { slug } = router.query;
  //     fetch(`http://localhost:3000/api/getblog?slug=${slug}`).then((a) => {
  //         return a.json();
  //     })
  //         .then((parsed) => {
  //             setBlog(parsed)
  //         })
  // }, [router.isReady])


   return <div key={blog && blog.topic} className={styles.container}>
        <main className={styles.main}>
            <h1>{blog && blog.topic}</h1>
            <hr />          
            
            {blog && <div dangerouslySetInnerHTML={createMarkup(blog.article)}></div>}
           <div>
            <h2 >Summary</h2>
            <p>{blog && blog.content}</p>
            </div>
            
        </main>
  </div>
}

// // static site randering method

// export async function getStaticPaths() {
//   return {
//       paths: [
//           { params: { slug: 'web' } },
//           { params: { slug: 'html' } },
//           { params: { slug: 'css' } },
//           { params: { slug: 'js' } },
//           { params: { slug: 'react' } },
//           { params: { slug: 'next' } },
//       ],
//       fallback: true // false or 'blocking'
//   };
// }



// export async function getStaticProps(context) {
//   const { slug } = context.params;
//   let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
//   return {
//       props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
//   }
// }


// server side randering method
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const {slug}=context.query
  const data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  const allBlog = await data.json()
 
  // Pass data to the page via props
  return { props: { allBlog } }
}

export default slug
