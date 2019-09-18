import axios from 'axios'

const https = ({
    url,
    method = 'GET',
    params,
    data,
    headers
}) => {
    return new Promise((resolve, reject) => {
        axios({
                url,
                method,
                params,
                data,
                headers
            }).then(res => resolve(res))
            .catch(error => reject(error))
    })
}

export default https