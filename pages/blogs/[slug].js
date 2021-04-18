import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import {useGetUser} from '@/actions/user'
import BlogApi from "lib/api/blogs";
import { Col, Row } from 'reactstrap';
import { SlateView } from "slate-simple-editor";
import Avatar from "components/shared/Avatar";
import {useRouter} from "next/router"

const BlogDetail = ({blog, author}) => {
    const {data, loading} = useGetUser()
    const router = useRouter();

    if (router.isFallback) {	
      return <h1>Your page is getting server</h1>	
    }
    return (
      <BaseLayout user={data} loading={loading} className="cover">
            <BasePage className="slate-container" title={`${blog.title} - Filip Jerga`}
                metaDescription={blog.subTitle}
            >
                <Row>
                    <Col md={{size: 8, offset: 4}}>
                        {router.isFallback && 
                            <h1 className="cover-heading">Your page is getting server...</h1>
                        }
                        {!router.isFallback && 
                            <>
                            <Avatar title={author.nickname} image={author.picture} date={blog.createdAt}/>
                            <hr/>
                            <SlateView initialContent={blog.content}/>
                            </>
                        }
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
  }

  export async function getStaticPaths() {
      const {data} = await new BlogApi().getAll();
    //   const blogs = json.data.blogs;
      const paths = data.map(({blog})=> ({params: {slug: blog.slug}}))
      return { paths, fallback: true};
  }

  export async function getStaticProps({params}) {
      const {data: {blog, author}} = await new BlogApi().getBySlug(params.slug);
      return{props: {blog, author},
            revalidate: 1}
  }
  
  export default BlogDetail;