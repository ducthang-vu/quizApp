import React, { ErrorInfo } from 'react';
import { Navigate } from 'react-router';

interface ErrorBoundaryStateProps {
    children: JSX.Element
}

interface ErrorBoundaryState {
    hasError: boolean;
    timeout: number;
}


export default class GenericErrorBoundary extends React.Component<ErrorBoundaryStateProps, ErrorBoundaryState> {
    private intervalId: number | undefined;

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor(props: ErrorBoundaryStateProps) {
        super(props);
        this.state = {
            hasError: false,
            timeout: 5
        };
    }

    private tick() {
        const update = (prev:ErrorBoundaryState): ErrorBoundaryState => ({
            hasError: true,
            timeout: Math.max(prev.timeout - 1, 0)
        })
        this.setState(update);
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    componentDidMount() {
        if (this.state.hasError) {
            this.intervalId = window.setInterval(() => this.tick(), 1000);
        }
    }

    componentDidUpdate() {
        if (this.state.hasError) {
            this.intervalId = window.setInterval(() => this.tick(), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const { hasError, timeout } = this.state;

        if (!hasError) {
            return this.props.children;
        }

        if (this.state.timeout <= 0) {
            return <Navigate to="/" replace={true} />
        }

        return (
            <div className="container">
                <h1>Something went wrong.</h1>
                <p>You will be redirect to home in {timeout} seconds...</p>
            </div>
        );

    }
}
