import { fetchUtils, Resource } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = "https://api-kaderisasi-dev.salmanitb.com/v1/"
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) =>{
        const url = `${apiUrl}/${resource}`
        const rnd = Math.random(0,100)
        return httpClient(url).then(({headers, json}) =>(
            
            
            {
            
            data: json.data,
            total: json.data.length
        }
        ))
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/kita-coba-saja-dulu`).then(({ json }) => ({
            data: json,
        })),
}