import { Rock, RockInstanceProps } from "@ruiapp/move-style";
import { genRockRenderer, renderRockChildren } from "@ruiapp/react-renderer";
import React from "react";
import ErrorBoundaryMeta from "./ErrorBoundaryMeta";
import { ErrorBoundaryRockConfig, ErrorBoundaryProps } from "./error-boundary-types";

export function configErrorBoundary(config: ErrorBoundaryRockConfig): ErrorBoundaryRockConfig {
  return config;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryRockConfig, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryRockConfig) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
  }

  clearError() {
    this.setState({
      hasError: false,
      error: undefined,
    });
  }

  render() {
    const { fallback, children } = this.props;
    const { _context: context } = this.props as any as RockInstanceProps;

    if (this.state.hasError) {
      if (fallback) {
        return renderRockChildren({ context, rockChildrenConfig: fallback });
      }

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
            <code>{JSON.stringify(children, null, 4)}</code>
          </pre>
        </div>
      );
    }

    return renderRockChildren({ context, rockChildrenConfig: children });
  }
}

export default {
  Renderer: genRockRenderer(ErrorBoundaryMeta.$type, ErrorBoundary, true),
  ...ErrorBoundaryMeta,
} as Rock<ErrorBoundaryRockConfig>;
