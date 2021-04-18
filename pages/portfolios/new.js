import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import withAuth from '@/hoc/withAuth';
import { Row, Col} from 'reactstrap';
import PortfolioForm from "@/components/PortfolioForm";
import {useCreatePortfolio} from'@/actions/portfolios';
import Redirect from '@/components/shared/Redirect'

const PortfoilioNew = ({user, loading: userLoading}) => {
    const [createPortfolio, {data, loading, error}] = useCreatePortfolio()
    
    if (data) {
        return <Redirect to="/portfolios"/>
    }

    return (
      <BaseLayout user={user} loading={userLoading} className="cover">
            <BasePage header="Create Portfolio">
                <Row>
                    <Col md="8">
                        <PortfolioForm onSubmit={createPortfolio}/>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
  }
  
  export default withAuth(PortfoilioNew)('admin');