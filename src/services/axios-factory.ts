import Axios from 'axios-observable';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { OpenTriviaTokenResponse } from '../core-data/open-trivia-response/open-trivia-token-response';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ResponseCode } from '../core-data/open-trivia-response/response-code';
import { Observable } from 'rxjs';
import { AxiosFactory } from '../core-data/axios-factory';


const fetchToken: Observable<string> = Axios.get<OpenTriviaTokenResponse>('https://opentdb.com/api_token.php?command=request').pipe(
    map(res => res.data.token),
    tap(newToken => window.localStorage.setItem('token', newToken))
);

function decorateConfigWithToken(config: AxiosRequestConfig, token: string) {
    return {
        ...config,
        params: {
            ...config.params,
            token
        }
    };
}


async function requestInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    let token = window.localStorage.getItem('token');
    if (!token) {
        console.warn('Retrieving new token.');
        token = await fetchToken.toPromise();
    }
    return decorateConfigWithToken(config, token);
}

async function responseInterceptor(value: AxiosResponse): Promise<AxiosResponse> {
    if ([ResponseCode.TOKEN_NOT_FOUND, ResponseCode.TOKEN_TO_BE_REFRESHED].includes(value.data.response_code)) {
        console.warn('Retrieving new token, then retry the http call.');
        const getConfig = (token: string): AxiosRequestConfig => decorateConfigWithToken(value.config, token);
        return fetchToken.pipe(
            map(getConfig),
            mergeMap(Axios.request)
        ).toPromise();
    }
    return value;
}


export const axiosFactory: AxiosFactory = () => {
    const axios = Axios.create({
        baseURL: 'https://opentdb.com/api.php'
    });

    axios.interceptors.request.use(requestInterceptor);
    axios.interceptors.response.use(responseInterceptor);

    return axios;
};
