export interface Blog {
    id: number;
    title: string;
    subtitle: string;
    body: string;
    report_type: string;
    is_primary: boolean;
    publisher_name: string;
    publisher_job: string;
    created_at: string;
  }

  export interface BlogFormData {
    title: string;
    subtitle: string;
    body: string;
    reportType: string;
    isPrimary: boolean;
    publisherName: string;
    publisherJob: string;
  }
  

  