export type Filter = {
  period?: string[];
  team?: string[];
  status?: string[];
  limit?: boolean[];
  category?: string[];
  total?: boolean[];
};

type FilterType = "activity" | "contract";

const initialFilterConfig: Record<FilterType, Partial<Filter>> = {
  activity: { team: [], period: [], status: [], limit: [], total: [] },
  contract: { team: [], category: [] },
};

export const createInitialFilter = (type: FilterType): Filter => {
  return initialFilterConfig[type];
};
