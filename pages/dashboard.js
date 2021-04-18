import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import withAuth from 'hoc/withAuth'
import { Row, Col, Button} from 'reactstrap';
import Masthead from 'components/shared/Masthead';
import Link from 'next/link'
import PortButtonDropdown from "components/shared/Dropdown";
import {useUpdateBlog, useGetUserBlogs} from 'actions/blogs';
import { toast } from "react-toastify";

const Dashborad = ({user, loading}) => {
  const [updateBlog] = useUpdateBlog()
  const {data: blogs, mutate} = useGetUserBlogs()

  const changeBlogStatus = async (blogId, status) => {
    await updateBlog(blogId, {status})
    .then(() => mutate())
    .catch(() => toast.error('Somethong went wrong...'))
    
  }

  const createOption = (blogStatus) => {
    return blogStatus === 'draft' ? {view: 'Publish Story', value: 'published'}
                                  : {view: 'Make a Draft', value: 'draft'}
  }
  const createOptions = (blog) => {
    const option = createOption(blog.status)

    return [
      { key: `${blog._id}-published`,
        text: option.view,
        handlers: {
          onClick: () => changeBlogStatus(blog._id, option.value)}
      },
      {key: `${blog._id}-delete`, 
      text: 'Delete',
       handlers: { 
           onClick: () => changeBlogStatus(blog._id, 'deleted')}
        }
    ]
  }


    const renderBlogs = (blogs, status) => (
      <ul className="user-blogs-list">
        {
          blogs && blogs.filter(blog => blog.status === status).map(blog =>
            <li key={blog._id}>
              <Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
                <a>{blog.title}</a>
              </Link>
              <PortButtonDropdown items={createOptions(blog)}/>
            </li>
            )
        }
      </ul>
    )

    return (     
        <BaseLayout navClass="transparent" user={user} loading={loading}>
            <Masthead imagePath="/images/home-bg.jpg"> 
            <h1>Blogs Dashboard</h1>
            <span className="subheading">
            Let's write some nice blog today{' '}
                <Link href='/blogs/editor'>
                <Button color="primary">Create a new Blog</Button>
            </Link></span>
            </Masthead>
          <BasePage className="blog-user-page">
            <Row>
              <Col md="6" className="mx-auto text-center">
                <h2 className="blog-status-title"> Published Blogs </h2>
                {renderBlogs(blogs, 'published')}
              </Col>
              <Col md="6" className="mx-auto text-center">
                <h2 className="blog-status-title"> Draft Blogs </h2>
                {renderBlogs(blogs, 'draft')}
              </Col>
            </Row>
          </BasePage>
        </BaseLayout>
    )
  }
  
  export default withAuth(Dashborad)('admin');

// import BasePage from "@/components/BasePage";
// import BaseLayout from "@/components/Layouts/BaseLayout";
// import {withAuth} from 'utils/auth0'
// import { Row, Col} from 'reactstrap';
// import Masthead from 'components/shared/Masthead';
// import Link from 'next/link'
// import auth0 from 'utils/auth0'
// import BlogApi from 'lib/api/blogs'
// import PortButtonDropdown from "components/shared/Dropdown";
// import {useUpdateBlog} from 'actions/blogs';

// const Dashborad = ({user, blogs}) => {
//   const [updateBlog] = useUpdateBlog()

//   const changeBlogStatus = async (blogId, status) => {
//     await updateBlog(blogId, {status});
//   }

//   const createOption = (blogStatus) => {
//     return blogStatus === 'draft' ? {view: 'Publish Story', value: 'published'}
//                                   : {view: 'Make a Draft', value: 'draft'}
//   }
//   const createOptions = (blog) => {
//     const option = createOption(blog.status)

//     return [
//       { key: `${blog._id}-published`,
//         text: option.view,
//         handlers: {
//           onClick: () => changeBlogStatus(blog._id, option.value)}
//       },
//       {key: `${blog._id}-delete`,text: 'Delete', handlers: { onClick: () => {alert(`Clicking Delete! ${blog._id}`)}}}
//     ]
//   }


//     const renderBlogs = (blogs, status) => (
//       <ul className="user-blogs-list">
//         {
//           blogs.filter(blog => blog.status === status).map(blog =>
//             <li key={blog._id}>
//               <Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
//                 <a>{blog.title}</a>
//               </Link>
//               <PortButtonDropdown items={createOptions(blog)}/>
//             </li>
//             )
//         }
//       </ul>
//     )

//     return (     
//         <BaseLayout navClass="transparent" user={user} loading={false}>
//             <Masthead imagePath="/images/home-bg.jpg"/>
//           <BasePage className="blog-user-page">
//             <Row>
//               <Col md="6" className="mx-auto text-center">
//                 <h2 className="blog-status-title"> Published Blogs </h2>
//                 {renderBlogs(blogs, 'published')}
//               </Col>
//               <Col md="6" className="mx-auto text-center">
//                 <h2 className="blog-status-title"> Draft Blogs </h2>
//                 {renderBlogs(blogs, 'draft')}
//               </Col>
//             </Row>
//           </BasePage>
//         </BaseLayout>
//     )
//   }

//   export const getServerSideProps = withAuth( async ({req, res}) => {
//     const {accessToken} = await auth0.getSession(req);
//     const json = await new BlogApi(accessToken).getByUser();
//     return {blogs: json.data}
//   })('admin');
  
//   export default Dashborad;