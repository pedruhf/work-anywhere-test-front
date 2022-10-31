import { HttpClient } from "@/data/contracts";
import { UpdateFilmsFromApi } from "@/domain/features";
import { AxiosAdapter } from "@/infra/http";

export class RemoteUpdateFilmsFromApi implements UpdateFilmsFromApi {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient = new AxiosAdapter(),
  ) {}

  async execute(): Promise<void> {
    await this.httpClient.request(this.url, "post");
  }
}
