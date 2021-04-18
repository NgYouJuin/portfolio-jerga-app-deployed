import Link from "next/link";
import BaseLayout from '@/components/Layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import {useGetUser} from '@/actions/user'
import PortfolioApi from '@/lib/api/portfolio'
import { Row, Col} from 'reactstrap';
import PortfolioCard from "@/components/PortfolioCard";
import {useRouter} from "next/router";
import { Button } from "reactstrap"
import {isAuthorized} from "@/utils/auth0"
import { useDeletePortfolio } from "@/actions/portfolios";
import { useState } from "react";

const Portfolios = ({portfolios: initialPortfolios}) => {
    const router = useRouter();
    // const {data, error, loading} = useGetPosts();
    const [portfolios, setPortfolios] = useState(initialPortfolios)
    const [deletePortfolio, {data, error}] = useDeletePortfolio();
    const {data: dataU, loading: loadingU} = useGetUser();
    // const renderPortfolios = (portfolios) => {
    //     return portfolios.map(portfolio =>
    //       <li key={portfolio._id} style={{'fontSize': '20px'}}>
    //         <Link as={`/portfolios/${portfolio._id}`} href="/portfolios/[id]">
    //           <a>
    //             {portfolio.title}
    //           </a>
    //         </Link>
    //       </li>
    //     )
    //   }
      const _deletePortfolio = async (e, portfolioId) => {
        e.stopPropagation();
        const isConfirm = confirm('Are you sure you want to delete this portfolio?')
        if(isConfirm){
          await deletePortfolio(portfolioId);
          setPortfolios(portfolios.filter(p => p._id !== portfolioId))
        }
      }
    return (
        <BaseLayout user={dataU} loading={loadingU} className="cover">
            {/* <Container>
                <Button color="danger">
                    Danger
                </Button>
                <div className="parent-class sibling-class">
                    <h1>Hi there student!</h1>
                    <h2>Hi there student 2!</h2>
                    <div className="parent-class-title">
                        Hello World
                    </div>
                    <div className="parent-class-date">
                        2000
                    </div>
                </div>
            </Container> */}
                <BasePage title="Newest Portfolios - Filip Jerga" header="Portfolios" className="portfolio-page">
                     {/* <ul>
                        {renderPortfolios(portfolios)}
                     </ul> */}
                     <Row> 
                     {portfolios.map(portfolio => 
                        
                        <Col key={portfolio._id} md="4" onClick={() => {
                            router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`)
                        }}>
                            <PortfolioCard portfolio={portfolio}>
                              { dataU && isAuthorized(dataU, 'admin') &&
                                <>
                                <Button className="mr-2" color="warning" onClick={(e) => {
                                  e.stopPropagation();
                                   router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`)
                                }}>Edit</Button>
                                <Button
                                onClick={(e) => _deletePortfolio(e, portfolio._id)}
                                color="danger">Delete</Button>
                              </>
                              }
                            </PortfolioCard>
                        </Col>
                     
                     )}
                     </Row>
                </BasePage>   
        </BaseLayout>
    )
  }

// This function is called during the build time
// Improved performance of page,
// It will create static page with dynamic data
export async function getStaticProps() {
    const json = await new PortfolioApi().getAll();
    const portfolios = json.data;
    return {
      props: { portfolios },
      revalidate: 1
    }
  }
  
  export default Portfolios;