import React, { ErrorInfo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';


interface ErrorBoundaryStateProps extends RouteComponentProps<any> {
    children: JSX.Element
}

interface ErrorBoundaryState {
    hasError: boolean;
    timeout: number;
}


class GenericErrorBoundary extends React.Component<ErrorBoundaryStateProps, ErrorBoundaryState> {
    private intervalId: number | undefined;

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor(props: any) {
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
        // You can also log the error to an error reporting service
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
        if (this.state.timeout <= 0) {
            this.props.history.push('/')
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {
        const { hasError, timeout } = this.state;
        if (hasError) {
            return (
                <div className="container">
                    <h1>Something went wrong.</h1>
                    <p>You will be redirect to home in {timeout} seconds...</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default withRouter<any, any>(GenericErrorBoundary);
