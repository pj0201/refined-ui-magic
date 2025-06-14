
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.vercel.app/api' 
  : '/api';

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/process-file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('ファイルアップロードに失敗しました');
    }

    return response.json();
  }

  async searchDocuments(query: string): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('検索に失敗しました');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
