import { TABS } from "@/components/Timer/constants";

export type SelectedTabType = (typeof TABS)[number]["title"];
export type SelectedCountdownType = (typeof TABS)[number]["countdown"];
