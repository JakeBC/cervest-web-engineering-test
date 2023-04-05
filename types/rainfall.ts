export type RegionValue = {
  regionName: string;
  value: number;
};

export type RainfallItem = {
  date: string;
  data: RegionValue[];
};

export type RainfallData = RainfallItem[];

export type RainfallTableData = {
  table: string[][];
  regions: string[];
  totalRainfall: number;
  averageRainfall: number;
  consecutiveDaysOver10mm: number;
};

