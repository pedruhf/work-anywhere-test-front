import { RemoteUpdateFilmsFromApi } from "@/data/use-cases";
import { UpdateFilmsFromApi } from "@/domain/features";

export const makeUpdateFilmsUseCase = (url?: string): UpdateFilmsFromApi => {
  const updateFilmsUrl = `/api/${url ?? "save-films-from-api"}`;
  return new RemoteUpdateFilmsFromApi(updateFilmsUrl);
};
