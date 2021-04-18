import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import {useGetUser} from '@/actions/user'
import BlogApi from "lib/api/blogs";
import { Col, Row } from 'reactstrap';
import { SlateView } from "slate-simple-editor";
import Avatar from "components/shared/Avatar";


const BlogDetail = ({blog, author}) => {
    const {data, loading} = useGetUser()
    return (
      <BaseLayout user={data} loading={loading} className="cover">
            <BasePage className="slate-container" title={`${blog.title} - Filip Jerga`}
                metaDescription={blog.subTitle}
            >
                <Row>
                    <Col md={{size: 8, offset: 4}}>
                        <Avatar title={author.nickname} image={author.picture} date={blog.createdAt}/>
                        <hr/>
                        <SlateView initialContent={blog.content}/>
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
      return { paths, fallback: false};
  }

  export async function getStaticProps({params}) {
      const {data: {blog, author}} = await new BlogApi().getBySlug(params.slug);
      return{props: {blog, author},
            revalidate: 1}
  }
  
  export default BlogDetail;