import React from 'react';
import ErrorMessage from './ErrorMessage';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorMessage error={this.state.error}/>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary