declare global {
  interface Window {
    belvoSDK: {
      createWidget: (token: string, options: BelvoWidgetOptions) => BelvoWidget;
    };
  }
}

export interface BelvoError extends Error {
  type: string;
  message: string;
  code?: string;
}

export interface BelvoEvent {
  eventName: 'ERROR' | 'WARNING' | 'PAGE_LOAD';
  request_id?: string;
  meta_data: {
    error_code?: string;
    error_message?: string;
    warning_code?: string;
    warning_message?: string;
    page?: string;
    from?: string;
    institution_name?: string;
    timestamp?: string;
  };
}

export interface BelvoWidget {
  build: () => void;
}

export interface BelvoWidgetOptions {
  callback?: (linkId: string, institutionName: string) => void;
  onError?: (error: Error) => void;
  onEvent?: (data: BelvoEvent) => void;
  onExit?: () => void;
  locale?: string;
  institution_types?: string[];
}
