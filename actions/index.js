import { useState } from 'react';

// export const useGetData = (url) => {
//     const [data, setData] = useState()
//     const [error, setError] = useState();
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         async function fetchData() {
//             const res = await fetch(url);
//             const result = await res.json();
//             if (res.status !== 200){
//                 setError(result)
//             }else{
//                 setData(result)
//             }        
//             setLoading(false);    
//         }
//         url && fetchData();
//     }, [url])

//     return {data, error, loading}
// }

// import useSWR from 'swr'

export const fetcher = (url, options) =>
  fetch(url, options).then(async res => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });


  export function useApiHandler(apiCall) {
    const [reqState, setReqState] = useState({
        error: null,
        data: null,
        loading: false
    });


    const createPortfoliioHandler = async (...data) => {
        setReqState({error: null, data: null, loading: true})
        try {
            const json = await apiCall(...data)
            setReqState({error: null, data: json.data, loading: false})
            return json.data;
        } catch (e) {
            const message = (e.response && e.response.data) || 'Ooops, something went wrong...';
            setReqState({error: message, data: null, loading: false})
            return Promise.reject(message);
        }
    }

    return [createPortfoliioHandler,{...reqState}]
}