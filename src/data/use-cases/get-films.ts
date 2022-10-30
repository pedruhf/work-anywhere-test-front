import { Film } from "@/domain/models";
import { HttpClient } from "@/data/contracts";
import { GetFilms, GetFilmsFilterParams } from "@/domain/features";
import { AxiosAdapter } from "@/infra/http";

export class RemoteGetFilms implements GetFilms {
  constructor(private readonly url: string, private readonly httpClient: HttpClient = new AxiosAdapter()) {}

  async execute(filterParams?: GetFilmsFilterParams): Promise<Film[]> {
    const response = await this.httpClient.request<Film[]>(this.url, "get", {
      params: {
        page: filterParams?.page,
        limit: filterParams?.limit,
      },
    });
    return response.data ?? [];
  }
}
