import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'

const Blog = (props) => {
   const [blogs,setBlogs]=useState(props.allBlogs);

// use in the case of not using server side reandering.

// useEffect(()=>{
//     fetch('http://localhost:3000/api/blogs').then((a)=>{
//         return a.json();})
//      .then((parsed)=>{
//         setBlogs(parsed)
//      })   
    
// },[])
    
  return (
    
    <div className={styles.container}>
    <main className={styles.main}>
      <div className="blogs">
    {blogs.map((blogItem)=>{
        return( <div className={styles.blogItem}>
         <Link href={`blogpost/${blogItem.slug}`}>
         <h3> {blogItem.topic} </h3></Link>
         <p> {blogItem.content.substr(0,100)}... </p>
       </div>
    )})}
      </div>
    </main>
  </div>
  )
}



// // static site randering method
// export async function getStaticProps(context) {
//   let data = await fs.promises.readdir("blogdata");
//   let myfile;
//   let allBlogs = [];
//   for (let index = 0; index < data.length; index++) {
//       const item = data[index];
//       console.log(item)
//       myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
//       allBlogs.push(JSON.parse(myfile))
//   }

//   return {
//       props: { allBlogs }, // will be passed to the page component as props
//   }
// }




// server side randering method
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const data = await fetch('http://localhost:3000/api/blogs')
  const allBlogs = await data.json()
 
  // Pass data to the page via props
  return { props: { allBlogs } }
}


export default Blog
