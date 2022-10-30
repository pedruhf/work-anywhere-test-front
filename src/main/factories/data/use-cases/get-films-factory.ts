import { RemoteGetFilms } from "@/data/use-cases";
import { GetFilms } from "@/domain/features";

export const makeGetFilmsUseCase = (url?: string): GetFilms => {
  const getFilmsUrl = `/api/${url ?? "films"}`;
  return new RemoteGetFilms(getFilmsUrl);
};
