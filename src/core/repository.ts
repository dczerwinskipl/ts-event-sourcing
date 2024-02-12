import { Aggregate } from "./aggregate";

export type Repository<T extends Aggregate> = {
  find: (id: string) => Promise<T | null>;
  save: (item: T) => Promise<void>;
};

