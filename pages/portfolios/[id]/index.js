import BaseLayout from "@/components/Layouts/BaseLayout"
import {useRouter} from "next/router"
import BasePage from "@/components/BasePage"
import {useGetUser} from '@/actions/user'
import PortfolioApi from '@/lib/api/portfolio'
import { formatDate } from "helpers/functions"

const Portfolio = ({portfolio}) => {
    const router = useRouter();

    const {data: dataU, loading: loadingU} = useGetUser()
    return (
      <BaseLayout navClass="transparent" user={dataU} loading={loadingU} className="cover">
            <BasePage
            noWrapper
            indexPage
            title={`${portfolio.title} - Filip Jerga`}
            metaDescription={portfolio.description}>
            <div className="portfolio-detail">
              <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
              <main role="main" className="inner page-cover">
                <h1 className="cover-heading">{portfolio.title}</h1>
                <p className="lead dates">{formatDate(portfolio.startDate)} - {formatDate(portfolio.endDate) || 'Present'}</p>
                <p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
                <p className="lead">{portfolio.description}</p>
                <p className="lead">
                  <a href={portfolio.companyWebsite} target="_" className="btn btn-lg btn-secondary">Visit Company</a>
                </p>
              </main>
              </div>
            </div>
            </BasePage>
        </BaseLayout>
    )
}

// export async function getServerSideProps({params}) {
//     let post = {};
//     try {
//         const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
//         post = res.data
//     } catch(e) {
//         console.log(e)
//     }
//     return {
//         props: {
//         post: post}
//     }
// }

// export async function getServerSideProps({query}) {
//     const json = await new PortfolioApi().getById(query.id);
//     const portfolio = json.data;
//     return {
//       props: { portfolio }
//     }
//   }
  
export async function getStaticPaths() {
    const json = await new PortfolioApi().getAll();
    const portfolios = json.data;

      // Get the paths we want pre-render based on portfolio ID
  const paths = portfolios.map(portfolio => {
    return {
      params: {id: portfolio._id}
    }
  })
    // fallback: false means that "not found pages" will be resolved into 404 page
    return { paths, fallback: false };
}

export async function getStaticProps({params}) {
    const json = await new PortfolioApi().getById(params.id);
    const portfolio = json.data;
    return { props: {portfolio},
             revalidate: 1
            };
  }
  
export default Portfolio;