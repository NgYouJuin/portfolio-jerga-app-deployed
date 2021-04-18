import PortfolioApi from '@/lib/api/portfolio'
import auth0 from '@/utils/auth0'

export default async function createPortfolio(req, res) {
    try {
        const { accessToken } = await auth0.getSession(req);
        // console.log(accessToken)
        const json = await new PortfolioApi(accessToken).create(req.body)
        return res.json(json.data);
    } catch (e) {
        return res.status(e.status || 422).json(e.response.data);
    }
}