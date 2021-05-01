import { axiosFactory } from '../services/axios-factory';
import Axios from 'axios-observable';

describe('axiosFactory', () => {
    const service = axiosFactory()

    it('object returned by axiosFactory is instance of axios', () => {
        expect(service instanceof Axios).toBe(true);
    })
})
