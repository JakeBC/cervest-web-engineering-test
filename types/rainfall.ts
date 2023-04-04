export type RegionValue = {
  regionName: string;
  value: number;
};

export type RainfallItem = {
  date: string;
  data: RegionValue[];
};

export type RainfallData = RainfallItem[];

export type RainfallTableData = (string|number)[][];

