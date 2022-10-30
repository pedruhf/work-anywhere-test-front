import { HttpClient } from "@/data/contracts";
import { GetFilms, GetFilmsFilterParams } from "@/domain/features";
import { AxiosAdapter } from "@/infra/http";
import { GetFilmsResponse } from "domain/features";

export class RemoteGetFilms implements GetFilms {
  constructor(private readonly url: string, private readonly httpClient: HttpClient = new AxiosAdapter()) {}

  async execute(filterParams?: GetFilmsFilterParams): Promise<GetFilmsResponse> {
    const response = await this.httpClient.request<GetFilmsResponse>(this.url, "get", {
      params: {
        page: filterParams?.page,
        limit: filterParams?.limit,
      },
    });
    return response.data;
  }
}
