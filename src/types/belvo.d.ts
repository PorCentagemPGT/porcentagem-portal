interface BelvoEvent {
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

interface BelvoWidgetOptions {
  callback?: (link: { id: string }, institution: { name: string }) => void;
  onError?: (error: Error) => void;
  onEvent?: (data: BelvoEvent) => void;
  onExit?: () => void;
  locale?: string;
  institution_types?: string[];
}

interface BelvoSDK {
  createWidget: (token: string, options: BelvoWidgetOptions) => {
    build: () => void;
  };
}

interface Window {
  BelvoSDK: new () => BelvoSDK;
}
