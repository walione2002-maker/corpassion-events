'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <GlassCard className="p-6 my-4 border-red-500/20 bg-red-500/5">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Component Error</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                There was a problem loading this section.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => this.setState({ hasError: false })}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </GlassCard>
      );
    }

    return this.props.children;
  }
}
