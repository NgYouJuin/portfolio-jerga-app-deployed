import BasePage from "@/components/BasePage";
import BaseLayout from "@/components/Layouts/BaseLayout";
import withAuth from '@/hoc/withAuth';


const Secret = ({user, loading}) => {
    return (
        <BaseLayout user={user} loading={loading} className="cover">
              <BasePage>
                  <h1>I am Secret Page - Hello {user.nickname}</h1>
              </BasePage>
          </BaseLayout>
      )
   
  }

  // High Order Component - HOC
//   function withAuth(Component) {
//     return function(props) {
//         return <Component title="Hello World" {...props}/>
//     }
//   }

// function withAuth(Component) {
//     return props => {
//         return <Component title="Hello World" {...props}/>
//     }
//   }

// const withAuth = (Component) => props => 
//     <Component title="Hello World" {...props}/>

  
export default withAuth(Secret)();