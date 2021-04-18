import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import {useGetUser} from '@/actions/user'
import { Row, Col } from 'reactstrap';

const Cv = () => {
    const {data, loading} = useGetUser()
    return (
      <BaseLayout user={data} loading={loading} className="cover">
            <BasePage title="Cv -Filip Jerga">
                <Row>
                    <Col md={{size: 8, offset: 2}}>
                        <iframe src="/jerga_cv.pdf" style={{width: '100%', height: '800px'}}></iframe>
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
  }
  
  export default Cv;