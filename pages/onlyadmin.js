import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import withAuth from '@/hoc/withAuth';


const OnlyAdmin = ({user, loading}) => {
    return (
        <BaseLayout user={user} loading={loading} className="cover">
              <BasePage>
                  <h1>I am OnlyAdmin Page - Hello {user.nickname}</h1>
              </BasePage>
          </BaseLayout>
      )
   
  }

  export default withAuth(OnlyAdmin)('admin');