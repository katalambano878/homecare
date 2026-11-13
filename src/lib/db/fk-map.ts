// Foreign keys and JSON columns for the MidAid plain-Postgres query builder.
export interface FkEdge {
  column: string;
  foreignTable: string;
  foreignColumn: string;
}

export const JSONB_COLUMNS: Record<string, Set<string>> = {
  admin_activity_log: new Set(["details"]),
  page_sections: new Set(["extra_data"]),
  staff_questionnaires: new Set(["form_data"]),
};

export const FK_MAP: Record<string, FkEdge[]> = {
  navigation_items: [
    { column: "parent_id", foreignTable: "navigation_items", foreignColumn: "id" },
  ],
};
