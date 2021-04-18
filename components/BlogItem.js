import moment from 'moment';
import Link from 'next/link';

const BlogItem = ({blog}) =>
<div>
    <div className="post-preview clickable">
        <Link href="/blogs/[slug]" as={`/blogs/${blog.slug}`}>
        <a>
            <h2 className="post-title">
            {blog.title}
            </h2>
            <h3 className="post-subtitle">
            {blog.subtitle}
            </h3>
        </a>
        </Link>
        <p className="post-meta">Posted by
        <a href="#"> {blog.author.nickname} </a>
        {/* - {blog.createdAt.split('T')[0].split("-").join(":")} */}
        - {moment(blog.createdAt).format('LLLL')}
        </p>
    </div>
</div>

export default BlogItem;