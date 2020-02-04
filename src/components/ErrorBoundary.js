import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { eventId: null };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      Sentry.withScope((scope) => {
          scope.setExtras(errorInfo);
          const eventId = Sentry.captureException(error);
          this.setState({eventId});
      });
    }

    render() {
        if (this.state.hasError) {
            //render fallback UI
            return (
                <div>
                    <h2>Oh no! Something's went wrong.</h2>
                    <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
                </div>
            );
        }else {   
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default ErrorBoundary





















// import React, { Component } from 'react'

// import { sendError } from '../error-config'


// export default class ErrorBoundary extends Component {
    
//     state = {
//         hasError: false
//     }


    
//     componentDidCatch(error, info) {
//         this.setState({
//             hasError: true
//         })
//         sendError.captureException(error, { extra: info })
//     }
    
//     render(){
//             if(this.state.hasError){
//                 return <h2>Oh no! Something's went wrong.</h2>
//             } else {
//                 return this.props.children
//             }
//     }
// }