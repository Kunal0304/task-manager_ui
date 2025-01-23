import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthRoute({ element }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(-1);
        }
    }, [navigate]);

    return element;
}
