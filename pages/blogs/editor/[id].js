import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import withAuth from '@/hoc/withAuth'
import { useGetBlog, useUpdateBlog } from "actions/blogs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {Editor} from 'slate-simple-editor';

const BlogUpdatedEditor = ({user, loading}) => {
    const router = useRouter();
    const {data} = useGetBlog(router.query.id);
    const [updateBlog, {error, loading: isBlogLoading}] = useUpdateBlog()

    const _updateBlog = async data => {
        await updateBlog(router.query.id, data);
        toast.success('Blog Updated')
    }

    if(error) {
        toast.error(error);
    }
    return (
      <BaseLayout user={user} loading={loading} className="cover">
            <BasePage>
            { data && data.content &&
                <Editor
                    header="Update Your Blog..."
                    initialContent={data.content}
                    onSave={_updateBlog}
                    loading={isBlogLoading}
                />
                }
            </BasePage>
        </BaseLayout>
    )
  }
  
  export default withAuth(BlogUpdatedEditor)('admin');