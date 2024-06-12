import { ContainerRockConfig, RockConfig, Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import React from "react";

export interface ErrorBoundaryRockProps extends ContainerRockConfig {
  fallback?: RockConfig | RockConfig[];
}

export interface ErrorBoundaryProps {
  fallback?: any;
  children?: any;
  childrenConfig?: RockConfig | RockConfig[];
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
      return (
        <div>
          <pre
            style={{
              padding: "10px",
              color: "red",
              background: "#FFF0F0",
            }}
          >
            <code>{this.state.error?.toString()}</code>
          </pre>
          <div>
            <button onClick={() => this.clearError()}>Retry</button>
          </div>
          <pre>
            <code>{JSON.stringify(this.props.childrenConfig, null, 4)}</code>
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default {
  $type: "errorBoundary",

  slots: {
    fallback: {
      allowMultiComponents: true,
      required: false,
    },
  },

  Renderer(context, props: ErrorBoundaryRockProps) {
    return (
      <ErrorBoundary fallback={renderRockChildren({ context, rockChildrenConfig: props.fallback })} childrenConfig={props.children}>
        {renderRockChildren({ context, rockChildrenConfig: props.children })}
      </ErrorBoundary>
    );
  },
} as Rock;
