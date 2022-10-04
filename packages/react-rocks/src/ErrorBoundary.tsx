import { ContainerRockConfig, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import React from "react";

export interface ErrorBoundaryRockProps extends ContainerRockConfig {
  fallback?: RockConfig | RockConfig[];
}

export interface ErrorBoundaryProps {
  fallback?: any;
  children?: any;
}

export interface ErrorBoundaryStates {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  clearError() {
    this.setState({
      hasError: false,
      error: null,
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <pre style={{
          padding: "10px",
          color: "red",
          background: "#FFF0F0",
        }}><code>
          {
            this.state.error?.toString()
          }
        </code>
        </pre>
        <div><button onClick={() => this.clearError()}>Retry</button></div>
      </div>;
    }

    return this.props.children;
  }
}

export default {
  $type: "errorBoundary",

  slots: {
    fallback: {
      required: false,
    }
  },

  renderer(props: ErrorBoundaryRockProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    return <ErrorBoundary
      fallback={renderRockChildren(framework, page, props.fallback)}
    >
      {
        renderRockChildren(framework, page, props.children)
      }
    </ErrorBoundary>
  },

} as RockMeta;